"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(), blog_controller_1.createBlog);
router.get("/", blog_controller_1.listBlog);
router.get("/:id", blog_controller_1.detailBlog);
router.patch("/:id", (0, auth_1.default)(), blog_controller_1.updateBlog);
router.delete("/:id", (0, auth_1.default)(), blog_controller_1.deleteBlog);
exports.blogRoutes = router;
