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
exports.deleteCommentService = exports.updateCommentService = exports.listCommentService = exports.createCommentService = void 0;
const comment_model_1 = __importDefault(require("./comment.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../User/user.model"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const createCommentService = (id, payload, req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.user._id);
    if (!user) {
        throw new AppError_1.default("User not found", http_status_1.default.BAD_REQUEST);
    }
    const blog = yield blog_model_1.default.findById(id);
    if (!blog) {
        throw new AppError_1.default("Blog not found", http_status_1.default.BAD_REQUEST);
    }
    const commentData = Object.assign(Object.assign({}, payload), { blogId: id, name: req.user.name, email: req.user.email });
    const result = yield comment_model_1.default.create(commentData);
    return result;
});
exports.createCommentService = createCommentService;
const listCommentService = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield comment_model_1.default.find({ blogId });
    if (!blog) {
        throw new AppError_1.default("Blog not found", http_status_1.default.BAD_REQUEST);
    }
    const result = yield comment_model_1.default.find({ blogId });
    return result;
});
exports.listCommentService = listCommentService;
const updateCommentService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findById(id);
    if (!comment) {
        throw new AppError_1.default("Comment not found", http_status_1.default.BAD_REQUEST);
    }
    const result = yield comment_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updateCommentService = updateCommentService;
const deleteCommentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.default.findById(id);
    if (!comment) {
        throw new AppError_1.default("Comment not found", http_status_1.default.BAD_REQUEST);
    }
    const result = yield comment_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.deleteCommentService = deleteCommentService;
