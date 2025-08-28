export const createError = (statusCode, message) => {
  const err = new Error(message || "Something went wrong");
  err.statusCode = statusCode || 500;
  if (!err.stack) {
    // Forcefully capture stack if it's missing
    Error.captureStackTrace(err, createError);
  }
  return err;
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err); // fallback if stack is missing

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
