import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { verifyToken } from "../modules/User/user.utils";
import catchAsync from "../utils/catchAsync";
import User from "../modules/User/user.model";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token =
      req.headers.authorization?.split(" ")[1] || req.headers.authorization;

    if (!token) {
      throw new AppError("Token not found", 401);
    }

    const decoded = verifyToken(
      token,
      config.JWT_ACCESS_SECRET_KEY as string
    ) as JwtPayload;

    const { userId } = decoded;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = user;
    next();
  });
};

export default auth;
