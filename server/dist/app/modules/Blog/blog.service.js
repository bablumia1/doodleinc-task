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
exports.deleteBlogService = exports.updateBlogService = exports.detailBlogService = exports.listBlogService = exports.createBlogService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const comment_model_1 = __importDefault(require("../Comments/comment.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBlogService = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = Object.assign(Object.assign({}, payload), { userId: req.user._id });
    const result = yield blog_model_1.default.create(blogData);
    return result;
});
exports.createBlogService = createBlogService;
const listBlogService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.find().populate("userId");
    return result;
});
exports.listBlogService = listBlogService;
const detailBlogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id);
    if (!blog) {
        throw new AppError_1.default("Blog not found", http_status_1.default.BAD_REQUEST);
    }
    const result = yield blog_model_1.default.findById(id).populate("userId");
    return result;
});
exports.detailBlogService = detailBlogService;
const updateBlogService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.default.findById(id);
    if (!isBlogExist) {
        throw new AppError_1.default("Blog not found", http_status_1.default.BAD_REQUEST);
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updateBlogService = updateBlogService;
const deleteBlogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.default.findById(id);
    if (!isBlogExist) {
        throw new AppError_1.default("Blog not found", http_status_1.default.BAD_REQUEST);
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield comment_model_1.default.deleteMany({ blogId: id });
        const result = yield blog_model_1.default.findByIdAndDelete(id);
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default("Faild to delete blog", http_status_1.default.BAD_REQUEST);
    }
});
exports.deleteBlogService = deleteBlogService;
