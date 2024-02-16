/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, createContext, useState } from "react";
import { blogServices } from "../../services/blogService";
import { TComment } from "../../types/TBlog";

interface BlogContextType {
  blogs: [{ [x: string]: string }];
  blog: { [x: string]: string };
  comments: TComment[];
  loading: boolean;
  error?: string | null;
  success?: string | null;
  createBlog: (title: string, body: string) => void;
  fetchBlogs: () => void;
  fetchBlog: (id: string) => void;
  updateBlog: (id: string, title: string, body: string) => void;
  clearError: () => void;
  clearSuccess: () => void;
  createComment: (id: string, body: string) => void;
  getComments: (id: string) => void;
  deleteComment?: (id: string) => void;
}

export const BlogContext = createContext<BlogContextType>(
  {} as BlogContextType
);

export const BlogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const [blogs, setBlogs] = useState<[{ [x: string]: string }]>([{}]);
  const [blog, setBlog] = useState<{ [x: string]: string }>({});
  const [comments, setComments] = useState<TComment[]>([{} as TComment]);

  /**
   * Create a new blog
   * @param title
   * @param body
   */

  async function createBlog(title: string, body: string) {
    setLoading(true);

    const payload = { title, body };

    try {
      const res = await blogServices.createBlog(payload);

      const { data } = res?.data as any;
      setBlogs((prev) => [...prev, data] as any);
      setError(null);
      setSuccess("Blog created successfully!");
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  }

  /**
   * Fetch all blogs
   */
  async function fetchBlogs() {
    setLoading(true);

    try {
      const res = await blogServices.getBlogs();

      const { data } = res?.data as any;
      setBlogs(data);
      setError(null);
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }

  /**
   * Get a single blog
   * @param id
   */

  async function fetchBlog(id: string) {
    setLoading(true);

    try {
      const res = await blogServices.getBlog(id);

      const { data } = res?.data as any;
      setBlog(data);
      setError(null);
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  function clearSuccess() {
    setSuccess(null);
  }

  // Comments
  async function createComment(id: string, body: string) {
    setLoading(true);

    try {
      const res = await blogServices.createComment(id, body);
      const { data } = res?.data as any;

      // Update cached comments in localStorage
      const cachedComments = localStorage.getItem(`comments_${id}`);
      if (cachedComments) {
        const existingComments = JSON.parse(cachedComments);
        const updatedComments = [...existingComments, data];
        localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
      }

      setComments((prevComments) => [...prevComments, data]);
      setError(null);
      setSuccess("Comment created successfully!");
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  }

  async function getComments(id: string) {
    setLoading(true);

    try {
      // Check if comments are cached in localStorage
      const cachedComments = localStorage.getItem(`comments_${id}`);
      if (cachedComments) {
        const comments = JSON.parse(cachedComments);
        setComments(comments);
        setError(null);
        setLoading(false);
      } else {
        const res = await blogServices.getComments(id);
        const { data } = res?.data as any;

        localStorage.setItem(`comments_${id}`, JSON.stringify(data));

        setComments(data);
        setError(null);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }

  async function deleteComment(id: string) {
    setLoading(true);

    try {
      const res = await blogServices.deleteComment(id);
      const { data } = res?.data as any;

      // Update cached comments in localStorage
      const cachedComments = localStorage.getItem(`comments_${data.blogId}`);
      if (cachedComments) {
        const existingComments = JSON.parse(cachedComments);
        const updatedComments = existingComments.filter(
          (comment: TComment) => comment._id !== id
        );
        localStorage.setItem(
          `comments_${data.blogId}`,
          JSON.stringify(updatedComments)
        );
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== id)
      );
      setError(null);
      setSuccess("Comment deleted successfully!");
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  }

  return (
    <BlogContext.Provider
      value={{
        blogs,
        blog,
        loading,
        error,
        success,
        createBlog,
        fetchBlogs,
        updateBlog: () => {},
        fetchBlog,
        clearError,
        clearSuccess,
        createComment,
        getComments,
        comments,
        deleteComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
