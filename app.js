const express = require("express");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var cors = require("cors");

//importing from config.env files
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;

//connecting db
const mongo = require("./mongo");
mongo.connect();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//for linking the router files
app.use(require("./Routes/auth"));

//heroku hosting
if(process.env.NODE_ENV = "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
