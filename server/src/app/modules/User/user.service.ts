import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoinUser, TUser } from "./user.interface";
import User from "./user.model";
import { createToken } from "./user.utils";
import Blog from "../Blog/blog.model";

const registerUserService = async (user: TUser) => {
  const { email } = user;

  // Check user is exist or not
  const isUserExist = await User.isUserExist(email);
  if (isUserExist) {
    throw new AppError("User is already exist", httpStatus.BAD_REQUEST);
  }

  // Create new user
  const newUser = await User.create(user);

  // crate access token and refresh token
  const jwtPayload = { userId: newUser._id, email: newUser.email };
  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET_KEY as string,
    process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME as string
  );

  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET_KEY as string,
    process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME as string
  );

  return {
    user: newUser,
    accessToken,
    refreshToken,
  };
};

const loginUserService = async (payload: TLoinUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      "Email and password are required",
      httpStatus.BAD_REQUEST
    );
  }

  // Check user is exist or not
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new AppError("Invalid email or password", httpStatus.NOT_FOUND);
  }

  // Check password is correct or not
  const isPasswordCorrect = await User.isPasswordCorrect(email, password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", httpStatus.BAD_REQUEST);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", httpStatus.BAD_REQUEST);
  }

  // crate access token and refresh token
  const jwtPayload = { userId: user?._id, email: user?.email };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET_KEY as string,
    process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME as string
  );

  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET_KEY as string,
    process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME as string
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const userProfileService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  const blogs = await Blog.find({ userId: id }).sort({ createdAt: -1 });

  return {
    user,
    blogs,
  };
};

export { registerUserService, loginUserService, userProfileService };
