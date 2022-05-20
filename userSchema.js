const Joi = require("joi");

const userSchema = {
  regBody: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number(),
    work: Joi.string(),
    password: Joi.string(),
    cpassword: Joi.string(),
  }),

  loginBody: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = userSchema;
