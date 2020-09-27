const validationHelper = (req, res, next, schema) => {
  const validateResponse = schema.validate(req.body);

  if (validateResponse.error) {
    res.status(412).json(validateResponse);
  } else {
    req.body = validateResponse.value;
    next();
  }
};

module.exports = validationHelper;
