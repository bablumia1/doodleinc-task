"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const user_routes_1 = require("./app/modules/User/user.routes");
const globalErrorGandler_1 = __importDefault(require("./app/middlewares/globalErrorGandler"));
const blog_routes_1 = require("./app/modules/Blog/blog.routes");
const comment_routes_1 = require("./app/modules/Comments/comment.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// Application routes
app.use("/api/v1/auth", user_routes_1.userRoutes);
app.use("/api/v1/blogs", blog_routes_1.blogRoutes);
app.use("/api/v1/comments", comment_routes_1.commentRoutes);
// Middleware
app.use(notFound_1.default);
app.use(globalErrorGandler_1.default);
exports.default = app;
