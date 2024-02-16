/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  loginUserService,
  registerUserService,
  userProfileService,
} from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await registerUserService(req.body);

  const { user, accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User is created",
    data: { user, accessToken },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  const { user, accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successfully",
    data: {
      user,
      accessToken,
    },
  });
});

const userProfile = catchAsync(async (req, res) => {
  const result = await userProfileService(req.user._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export { registerUser, loginUser, userProfile };
