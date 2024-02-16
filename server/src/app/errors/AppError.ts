class AppError extends Error {
  constructor(
    message: string[] | string,
    public statusCode = 400
  ) {
    super(message instanceof Array ? message.join(", ") : (message as string));
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
