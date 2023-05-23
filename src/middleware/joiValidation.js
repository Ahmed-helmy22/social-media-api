const dataMethods = ['body', 'params', 'query', 'headers'];

const validation = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];
    dataMethods.forEach((key) => {
      if (schema[key]) {
        const result = schema[key].validate(req[key], { abortEarly: false });
        if (result?.error?.details) validationErrors.push(result.error.details);
      }
    });
    if (validationErrors.length) {
      res
        .status(400)
        .json({ status: 'error in your inputs', err: validationErrors });
    } else {
      next();
    }
  };
};

export default validation;
