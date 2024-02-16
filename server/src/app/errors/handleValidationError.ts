import mongoose from "mongoose";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): string[] => {
  const errors = Object.values(err.errors).map(({ path, message }) => {
    message = message
      .replace("Path ", "")
      .replace(/`/g, "")
      .replace(path, path.charAt(0).toUpperCase() + path.slice(1));

    return message;
  });
  return errors;
};

export default handleValidationError;
