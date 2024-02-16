import http from "../http";
import { TBlog } from "../types/TBlog";

const createBlog = async (blog: TBlog) => {
  return http.post("/blogs/create", blog);
};

const getBlogs = () => {
  return http.get("/blogs");
};

const getBlog = (id: string) => {
  return http.get(`/blogs/${id}`);
};

const updateBlog = (id: string, blog: TBlog) => {
  return http.patch(`/blogs/${id}`, blog);
};

const deleteBlog = (id: string) => {
  return http.delete(`/blogs/${id}`);
};

/**
 *
 * @param BlogId
 * @param comment
 * @returns
 */

const createComment = (id: string, body: string) => {
  return http.post(`/comments/${id}/create`, { body });
};

/**
 *
 * @param BlogId
 * @returns
 */

const getComments = (id: string) => {
  return http.get(`/comments/${id}`);
};

const deleteComment = (id: string) => {
  return http.delete(`/comments/${id}`);
};

export const blogServices = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getComments,
  deleteComment,
};
