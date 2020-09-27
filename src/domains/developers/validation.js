const joi = require('joi');
const validationHelper = require('../../helpers/validation-helper');

const create = (req, res, next) => validationHelper(
  req,
  res,
  next,
  joi.object({
    name: joi.string().required().min(5).max(200),
    sex: joi.string()
      .valid('M', 'F', 'X')
      .min(1)
      .max(1)
      .required(),
    hobby: joi.string().min(0).max(50),
    birthday: joi.date().required().required(),
  }),
);

const update = (req, res, next) => validationHelper(
  req,
  res,
  next,
  joi.object({
    name: joi.string().required().min(5).max(200),
    sex: joi.string()
      .valid('M', 'F', 'X')
      .min(1)
      .max(1)
      .required(),
    hobby: joi.string().min(0).max(50),
    birthday: joi.date().required().required(),
  }),
);

module.exports = {
  create,
  update,
};
