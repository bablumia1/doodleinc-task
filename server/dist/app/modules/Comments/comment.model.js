"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    blogId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
