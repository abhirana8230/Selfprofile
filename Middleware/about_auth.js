const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const mongo = require("../mongo");
const { db } = require("../mongo");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await mongo.db
      .collection("users")
      .findOne({ _id: ObjectId(verifyToken._id) });
    req.user = rootUser;

    next();
  } catch (error) {
    res.clearCookie("jwToken");
    res.status(401).send("Unauthorized user: No Token provided!");
    console.log(error);
  }
};

module.exports = Authenticate;
