const Joi = require('@hapi/joi');

const validateUser = (user) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(50).required(),
    gender: Joi.string().required(),
    jobRole: Joi.string().min(3).max(50).required(),
    department: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(50).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
};

module.exports.validate = validateUser;