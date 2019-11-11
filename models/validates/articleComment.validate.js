const Joi = require('@hapi/joi');

const validateArticleComment = (comment) => {
  const schema = Joi.object().keys({
    comment: Joi.string().max(100).required(),
  });
  return schema.validate(comment);
};

module.exports.validate = validateArticleComment;
