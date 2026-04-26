const env = require("../config/env");

const notFoundHandler = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error" : error.message,
    details: error.details,
    ...(env.nodeEnv !== "production" && statusCode === 500 ? { error: error.message } : {})
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
