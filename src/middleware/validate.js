const ApiError = require("../utils/api-error");

const validate = (schema, source = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    const details = result.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message
    }));

    return next(new ApiError(400, "Validation failed", details));
  }

  req[source] = result.data;
  return next();
};

module.exports = validate;
