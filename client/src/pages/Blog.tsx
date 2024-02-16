/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext, BlogContext } from "../context";
import parse from "html-react-parser";
import AnimateSpin from "../components/AnimateSpin/AnimateSpin";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const Blog = () => {
  const { id } = useParams();
  const {
    fetchBlog,
    blog,
    loading,
    createComment,
    error,
    success,
    clearError,
    clearSuccess,
    comments,
    getComments,
    deleteComment,
  } = useContext(BlogContext);

  const { user, profile, isAuthenticated } = useContext(AuthContext);

  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchBlog(id as string);
  }, [id]);

  useEffect(() => {
    profile();
  }, []);

  const [commentsFetched, setCommentsFetched] = useState(false);

  useEffect(() => {
    if (!commentsFetched) {
      getComments(id as string);
      setCommentsFetched(true);
    }
  }, [commentsFetched]);

  const { title, body, createdAt } = blog;
  const blogUser = blog?.userId;

  const handleCreateComment = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") {
      toast.error("Comment cannot be empty!");
    }
    createComment(id as string, comment);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    if (success) {
      toast.success(success);
      setComment("");
      clearSuccess();
    }
  }, [error, success]);

  const handleDeleteComment = (id: string) => {
    deleteComment && deleteComment(id);
  };

  const setAuthroComment = (id: string) => {
    const isAuthor = id === user?._id;
    return isAuthor;
  };

  return (
    <>
      {loading ? (
        <AnimateSpin />
      ) : (
        <div className="">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={createdAt}>
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {/* @ts-ignore */}
                    {" by " + blogUser?.name}
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {title}
                </h1>
              </div>
            </div>
          </header>
          <div className="max-w-5xl pt-10 pb-8 mx-auto prose border-t">
            {body && parse(body)}
          </div>

          {/* Comments */}
          <div className="max-w-5xl pt-10 pb-8 mx-auto border-t">
            {/* Comment Form */}
            <form className="mb-8" onSubmit={handleCreateComment}>
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              ></textarea>
              {isAuthenticated ? (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring-blue-500 active:bg-blue-700"
                >
                  Comment
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring-blue-500 active:bg-blue-700"
                >
                  Login to Comment
                </Link>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-8 ">
              {/* Comment 2 */}
              {comments &&
                comments.map((comment) => (
                  <div key={comment._id + Math.random()} className="flex">
                    <div className="flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="
                        https://via.placeholder.com/150
                        "
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium leading-5">
                        {comment?.name}
                      </div>
                      <div className="mt-1 text-sm leading-5 text-gray-500">
                        <p>{comment.body}</p>
                      </div>
                      <div className="flex mt-2 space-x-3 text-sm text-gray-400">
                        <time className="text-sm" dateTime={comment.createdAt}>
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                        <div>
                          {setAuthroComment(comment.userId) && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="transition duration-150 ease-in-out text-rose-500 hover:text-gray-700"
                            >
                              <FaTrashAlt />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
