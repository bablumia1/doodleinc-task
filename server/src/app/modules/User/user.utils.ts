import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  payload: { userId: Types.ObjectId; email: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
