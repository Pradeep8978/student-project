const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      console.log("REQ BODY =>", req.body);
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  validateParams: (schema) => {
    return (req, res, next) => {
      const params = { ...req.params, ...req.query };
      const result = Joi.validate(params, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      // name: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
      password: Joi.string().required(),
    }),
    loginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    queryUser: Joi.object().keys({
      role: Joi.string(),
    }),
    referalSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
      message: Joi.string(),
      referalId: Joi.string(),
      interested: Joi.string()
    }),
    productList: Joi.object().keys({
      search: Joi.string(),
      categories: Joi.string(),
    }),
    reviewSchema: Joi.object().keys({
      rating: Joi.number().integer().min(1).max(5).required(),
      description: Joi.string().required(),
    }),
    customerAuthSchema: Joi.object().keys({
      phone: Joi.number().integer().min(1000000000).max(9999999999),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      image: Joi.string(),
    }),
    customerloginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    }),
    changePassword: Joi.object().keys({
      oldpassword: Joi.string().required(),
      newpassword: Joi.string().required(),
    }),
    emailSchema: Joi.object().keys({
      toMail: Joi.string().email().required(),
      title: Joi.string().required(),
      content: Joi.string().required()
    }),
    otpGenerate: Joi.object().keys({
      email: Joi.string().email().required()
    }),
    checkOtp: Joi.object().keys({
      "email": Joi.string().email().required(),
      "otp": Joi.string().required()
    }),
    updateNewpassword: Joi.object().keys({
      email: Joi.string().email().required(),
      newpassword: Joi.string().required(),
      confirmpassword: Joi.any().valid(Joi.ref('newpassword')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    })
  },
};
