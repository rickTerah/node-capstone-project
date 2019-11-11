const Joi = require('@hapi/joi');

const validateUser = (user) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(50).required(),
  });
  return schema.validate(user);
};

module.exports.validateLogin = validateUser;
