const mongo = require("../mongo");
const { db } = require("../mongo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const { regBody, loginBody } = require("../userSchema");
const { date } = require("joi");

const service = {
  async find(req, res) {
    res.send("Hi, Welcome to server!");
  },

  async register(req, res) {
    const { name, email, phone, work, password, cpassword } = req.body;

    //validate request body
    const valid = await regBody.validate(req.body);
    if (valid.error) {
      res.send({ message: valid.error.details[0].message });
    } else {
      if (password !== cpassword) {
        res.send({ error: "Please enter same Password " });
      }
      try {
        const userExist = await mongo.db
          .collection("users")
          .findOne({ email: email });
        if (userExist) {
          res.status(422).json({ error: "User already exists!" });
        } else {
          //first bcrypt the password and then enter it to database
          const salt = await bcrypt.genSalt(12);
          const encryptedPass = await bcrypt.hash(password, salt);
          const encryptedCpass = await bcrypt.hash(cpassword, salt);
          req.body.password = encryptedPass;
          req.body.cpassword = encryptedCpass;

          //Insert to database
          const data = await mongo.db.collection("users").insertOne(req.body);
          res.status(201).json({ message: "User registered successfully!" });
        }
      } catch (error) {
        console.log(error);
        res.send({ error: "failed to register!" });
      }
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      //validation of req.body
      const valid = await loginBody.validate(req.body);
      if (valid.error) {
        res.send({ message: valid.error.details[0].message });
      } else {
        //check user already  exists
        var data = await mongo.db.collection("users").findOne({ email: email });
        if (!data) {
          res
            .status(400)
            .send({ error: "User doesn't exists, please register first!" });
        } else {
          //check password
          const valid = await bcrypt.compare(password, data.password);
          if (!valid) {
            res.status(400).send({ error: "Invalid credentials!" });
          } else {
            //Generate Token
            const token = await jwt.sign(
              { _id: data._id },
              process.env.SECRET_KEY
            );
            //store token to cookies
            res.cookie("jwToken", token, {
              expires: new Date(Date.now() + 300000),
              httpOnly: true,
            });
            //store token to database
            var data = await mongo.db
              .collection("users")
              .updateOne({ _id: data._id }, { $set: { token: token } });
            //instead of message login suuccessful now show the token
            res.send({ accessToken: token });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal server error!" });
    }
  },

  async about(req, res) {
    res.send(req.user);
  },

  async getData(req, res) {
    res.send(req.user);
  },

  async contact(req, res) {
    try {
      const { name, email, phone, message } = req.body;
      if (!name || !email || !phone || !message) {
        console.log("Error in contact form!");
        res.send({ error: "Pls fill the contact form properly!" });
      } else {
        const userContact = await mongo.db
          .collection("users")
          .findOne({ email: email });
        if (userContact) {
          const userContact = await mongo.db
            .collection("users")
            .updateOne(
              { email: email },
              { $set: { message: message, date: Date() } }
            );
          res.send({ message: "Message sent successfully!" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  async logout(req, res) {
    res.clearCookie("jwToken", { path: "/" });
    res.status(200).send({ message: "User Logout successfully!" });
  },
};

module.exports = service;
