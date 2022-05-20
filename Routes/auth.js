const express = require("express");
const router = express.Router();

const service = require("../Services/auth");
const authenticate = require("../Middleware/about_auth");

router.get("/", service.find);

//registration route
router.post("/register", service.register);

//login route
router.post("/login", service.login);

//about middleware route
router.get("/about", authenticate, service.about);

//contact and homepage middleware route
router.get("/getdata", authenticate, service.getData);

router.post("/contact", authenticate, service.contact);

router.get("/logout", service.logout);

module.exports = router;
