"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileService = exports.loginUserService = exports.registerUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    // Check user is exist or not
    const isUserExist = yield user_model_1.default.isUserExist(email);
    if (isUserExist) {
        throw new AppError_1.default("User is already exist", http_status_1.default.BAD_REQUEST);
    }
    // Create new user
    const newUser = yield user_model_1.default.create(user);
    // crate access token and refresh token
    const jwtPayload = { userId: newUser._id, email: newUser.email };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET_KEY, process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME);
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, process.env.JWT_REFRESH_SECRET_KEY, process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME);
    return {
        user: newUser,
        accessToken,
        refreshToken,
    };
});
exports.registerUserService = registerUserService;
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password) {
        throw new AppError_1.default("Email and password are required", http_status_1.default.BAD_REQUEST);
    }
    // Check user is exist or not
    const isUserExist = yield user_model_1.default.isUserExist(email);
    if (!isUserExist) {
        throw new AppError_1.default("Invalid email or password", http_status_1.default.NOT_FOUND);
    }
    // Check password is correct or not
    const isPasswordCorrect = yield user_model_1.default.isPasswordCorrect(email, password);
    if (!isPasswordCorrect) {
        throw new AppError_1.default("Invalid email or password", http_status_1.default.BAD_REQUEST);
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default("Invalid email or password", http_status_1.default.BAD_REQUEST);
    }
    // crate access token and refresh token
    const jwtPayload = { userId: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET_KEY, process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME);
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, process.env.JWT_REFRESH_SECRET_KEY, process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
exports.loginUserService = loginUserService;
const userProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new AppError_1.default("User not found", http_status_1.default.NOT_FOUND);
    }
    const blogs = yield blog_model_1.default.find({ userId: id });
    return {
        user,
        blogs,
    };
});
exports.userProfileService = userProfileService;
