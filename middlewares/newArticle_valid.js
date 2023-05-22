const Joi = require("joi");

const articlesValidationSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().min(3),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

const validateArticles = (req, res, next) => {
  const validationResult = articlesValidationSchema.validate(req.body);

  if (validationResult.error) {
    res.locals.customErrore = validationResult.error;

    return res
      .status(400)
      .json({ error: validationResult.error.details[0].message });
  }
  console.log(validationResult.error);
  next();
};

module.exports = { validateArticles };
