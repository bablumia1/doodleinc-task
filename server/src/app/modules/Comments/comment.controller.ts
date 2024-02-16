import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createCommentService,
  deleteCommentService,
  listCommentService,
  updateCommentService,
} from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await createCommentService(blogId, req.body, req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment created successfully",
    data: result,
  });
});

const listComment = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await listCommentService(blogId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment list retrieved successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const result = await updateCommentService(commentId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const result = await deleteCommentService(commentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment deleted successfully",
    data: result,
  });
});

export { createComment, listComment, updateComment, deleteComment };
