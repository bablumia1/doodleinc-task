import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
import { Request } from "express";
import Comment from "../Comments/comment.model";
import mongoose from "mongoose";

const createBlogService = async (req: Request, payload: TBlog) => {
  const blogData = {
    ...payload,
    userId: req.user._id as string,
  };
  const result = await Blog.create(blogData);
  return result;
};

const listBlogService = async () => {
  const result = await Blog.find().populate("userId").sort({ createdAt: -1 });
  return result;
};

const detailBlogService = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError("Blog not found", httpStatus.BAD_REQUEST);
  }

  const result = await Blog.findById(id).populate("userId");
  return result;
};

const updateBlogService = async (id: string, payload: Partial<TBlog>) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError("Blog not found", httpStatus.BAD_REQUEST);
  }
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlogService = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError("Blog not found", httpStatus.BAD_REQUEST);
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Comment.deleteMany({ blogId: id });

    const result = await Blog.findByIdAndDelete(id);

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError("Faild to delete blog", httpStatus.BAD_REQUEST);
  }
};

export {
  createBlogService,
  listBlogService,
  detailBlogService,
  updateBlogService,
  deleteBlogService,
};
