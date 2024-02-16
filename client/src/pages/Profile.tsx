/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext, ThemeContext } from "../context";
import { Link } from "react-router-dom";
import AnimateSpin from "../components/AnimateSpin/AnimateSpin";
import BlogList from "../components/List/BlogList";
import { toast } from "react-toastify";

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const {
    user,
    blogs,
    profile,
    logout,
    loading,
    deleteBlog,
    success,
    clearSuccess,
  } = useContext(AuthContext);

  useEffect(() => {
    profile();
  }, []);

  const handleDelete = (id: string) => {
    deleteBlog && deleteBlog(id);
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      clearSuccess();
    }
  }, [success && clearSuccess]);

  const setAuthroBlog = (id: string) => {
    const isAuthor = blogs?.map((blog) => blog.userId === id);
    return isAuthor?.includes(true);
  };

  return (
    <>
      {loading ? (
        <AnimateSpin />
      ) : (
        <div className="">
          <div className="container py-8 mx-auto">
            <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
              <div className="col-span-4 sm:col-span-3">
                <div
                  className={`p-6  rounded-lg shadow ${
                    theme === "dark" ? "bg-gray-900" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                    <p className="">{user?.email}</p>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col w-full">
                    <ul>
                      <li className="mb-2">Blogs: {blogs?.length}</li>
                      <li className="mb-2">
                        <Link to="/profile/blog-create" className="button-link">
                          Create Blog
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/blogs" className="button-link">
                          Favorite Blogs
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="bg-red-900 button-link"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-9">
                {blogs?.length > 0 ? (
                  blogs?.map((blog) => (
                    <BlogList
                      key={blog._id + Math.random()}
                      title={blog.title}
                      body={blog.body}
                      loading={loading}
                      id={blog._id}
                      deleteBlog={handleDelete}
                      isAuthor={setAuthroBlog(blog.userId)}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold">No Blogs</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
