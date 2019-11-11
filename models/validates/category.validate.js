const Joi = require('@hapi/joi');

const validateCategory = (category) => {
  const schema = Joi.object().keys({
    categoryName: Joi.string().min(2).max(50).required()
  });
  return schema.validate(category);
};

module.exports.validate = validateCategory;
