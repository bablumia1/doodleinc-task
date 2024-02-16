/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, createContext, useState } from "react";
import { authServices } from "../../services/authService";
import { blogServices } from "../../services/blogService";

interface AuthContextType {
  user: null | { [x: string]: string };
  loading: boolean;
  error?: string | null;
  success?: string | null;
  login: (email: string, password: string) => void;
  registerUser: (name: string, email: string, password: string) => void;
  logout: () => void;
  profile: () => void;
  clearError: () => void;
  clearSuccess: () => void;
  blogs: [{ [x: string]: string }];
  isAuthenticated: boolean;
  deleteBlog?: (id: string) => void;
  updateBlog?: (id: string, title: string, body: string) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const [user, setUser] = useState<null | { [x: string]: string }>(null);
  const [blogs, setBlogs] = useState<[{ [x: string]: string }]>([{}]);
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  async function registerUser(name: string, email: string, password: string) {
    setLoading(true);

    const payload = { name, email, password };

    try {
      const res = await authServices.register(payload);

      const { data } = res?.data as any;

      setSuccess("User created successfully!");
      localStorage.setItem("token", data.accessToken);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);

    const payload = { email, password };

    try {
      const res = await authServices.login(payload);

      const { data } = res?.data as any;
      localStorage.setItem("token", data.accessToken);
      setLoading(false);
      setSuccess("Login successfully!");
      setError(null);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }

  async function profile() {
    setLoading(true);

    try {
      const res = await authServices.profile();

      const { data } = res?.data as any;
      setUser(data.user);
      setBlogs(data.blogs);
      // setSuccess(res?.data?.message);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  }

  async function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  }

  function clearError() {
    setError(null);
  }
  function clearSuccess() {
    setSuccess(null);
  }

  async function deleteBlog(id: string) {
    setLoading(true);

    try {
      await blogServices.deleteBlog(id);
      const newBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(newBlogs as any);
      setError(null);
      setSuccess("Blog deleted successfully!");
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  }

  /**
   * Update a blog
   * Optional
   * @param id
   * @param title
   * @param body
   */

  async function updateBlog(id: string, title: string, body: string) {
    setLoading(true);

    const payload = { title, body };

    try {
      const res = await blogServices.updateBlog(id, payload);

      const { data } = res?.data as any;
      const newBlogs = blogs.map((blog) =>
        blog._id === id ? { ...blog, ...data } : blog
      );
      setBlogs(newBlogs as any);
      setError(null);
      setSuccess("Blog updated successfully!");
      setLoading(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        registerUser,
        login,
        logout,
        success,
        clearError,
        profile,
        blogs,
        isAuthenticated,
        deleteBlog,
        clearSuccess,
        updateBlog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
