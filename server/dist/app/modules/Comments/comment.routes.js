"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/:blogId/create", (0, auth_1.default)(), comment_controller_1.createComment);
router.patch("/:commentId", (0, auth_1.default)(), comment_controller_1.updateComment);
router.delete("/:commentId", (0, auth_1.default)(), comment_controller_1.deleteComment);
router.get("/:blogId", comment_controller_1.listComment);
exports.commentRoutes = router;
