/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import handleValidationError from "../errors/handleValidationError";
import { ErrorRequestHandler } from "express";

/* eslint-disable prefer-const */
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
      err,
      path: req.originalUrl,
      method: req.method,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") {
      const message = `Resource not found. Invalid: ${error.path}`;
      error = new AppError(message, httpStatus.NOT_FOUND);
    }
    if (err.name === "ValidationError") {
      const message = handleValidationError(err);
      error = new AppError(message, httpStatus.BAD_REQUEST);
    }

    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new AppError(message, httpStatus.NOT_FOUND);
    }
    return res.status(error.statusCode).json({
      message: error.message,
      path: req.originalUrl,
      method: req.method,
    });
  }
};

export default globalErrorHandler;
