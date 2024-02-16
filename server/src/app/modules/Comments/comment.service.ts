import Comment from "./comment.model";
import { Request } from "express";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import User from "../User/user.model";
import Blog from "../Blog/blog.model";

const createCommentService = async (
  id: string,
  payload: { body: string },
  req: Request
) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError("User not found", httpStatus.BAD_REQUEST);
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError("Blog not found", httpStatus.BAD_REQUEST);
  }

  const commentData = {
    ...payload,
    blogId: id,
    userId: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  const result = await Comment.create(commentData);
  return result;
};

const listCommentService = async (blogId: string) => {
  const blog = await Comment.find({ blogId });
  if (!blog) {
    throw new AppError("Blog not found", httpStatus.BAD_REQUEST);
  }

  const result = await Comment.find({ blogId });
  return result;
};

const updateCommentService = async (id: string, payload: { body: string }) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new AppError("Comment not found", httpStatus.BAD_REQUEST);
  }

  const result = await Comment.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCommentService = async (id: string) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new AppError("Comment not found", httpStatus.BAD_REQUEST);
  }

  const result = await Comment.findByIdAndDelete(id);
  return result;
};

export {
  createCommentService,
  listCommentService,
  updateCommentService,
  deleteCommentService,
};
