"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(({ path, message }) => {
        message = message
            .replace("Path ", "")
            .replace(/`/g, "")
            .replace(path, path.charAt(0).toUpperCase() + path.slice(1));
        return message;
    });
    return errors;
};
exports.default = handleValidationError;
