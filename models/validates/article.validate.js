const Joi = require('@hapi/joi');

const validateArticlePost = (article) => {
  const schema = Joi.object().keys({
    title: Joi.string().max(50).required(),
    article: Joi.string().max(2500).required(),
    categoryId: Joi.number().required(),
  });
  return schema.validate(article);
};

const validateArticleEdit = (article) => {
  const schema = Joi.object().keys({
    title: Joi.string().max(50).required(),
    article: Joi.string().max(2500).required(),
  });
  return schema.validate(article);
};

module.exports.validatePost = validateArticlePost;
module.exports.validateEdit = validateArticleEdit;
