import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createBlogService,
  deleteBlogService,
  detailBlogService,
  listBlogService,
  updateBlogService,
} from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await createBlogService(req, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog created successfully",
    data: result,
  });
});

const listBlog = catchAsync(async (req, res) => {
  const result = await listBlogService();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog list retrieved successfully",
    data: result,
  });
});

const detailBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await detailBlogService(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog detail retrieved successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateBlogService(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteBlogService(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

export { createBlog, listBlog, detailBlog, updateBlog, deleteBlog };
