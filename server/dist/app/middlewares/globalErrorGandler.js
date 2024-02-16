"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
/* eslint-disable prefer-const */
const globalErrorHandler = (err, req, res, next) => {
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
    }
    else if (process.env.NODE_ENV === "production") {
        let error = Object.assign({}, err);
        error.message = err.message;
        if (error.name === "CastError") {
            const message = `Resource not found. Invalid: ${error.path}`;
            error = new AppError_1.default(message, http_status_1.default.NOT_FOUND);
        }
        if (err.name === "ValidationError") {
            const message = (0, handleValidationError_1.default)(err);
            error = new AppError_1.default(message, http_status_1.default.BAD_REQUEST);
        }
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new AppError_1.default(message, http_status_1.default.NOT_FOUND);
        }
        return res.status(error.statusCode).json({
            message: error.message,
            path: req.originalUrl,
            method: req.method,
        });
    }
};
exports.default = globalErrorHandler;
