/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext, BlogContext, ThemeContext } from "../context";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();
  const { id } = useParams();

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ];

  const moule = {
    toolbar: toolbarOptions,
  };

  const { fetchBlog, blog } = useContext(BlogContext);
  const { updateBlog, loading, success, error, clearError, clearSuccess } =
    useContext(AuthContext);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const handleUpdate = () => {
    if (!title || !body) return toast.error("Please fill all the fields");
    updateBlog && updateBlog(id as string, title, body);
  };

  useEffect(() => {
    fetchBlog(id as string);
  }, [id]);

  useEffect(() => {
    setTitle(blog?.title || "");
    setBody(blog?.body || "");
  }, [blog]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTitle("");
      setBody("");
      navigation("/profile");
      clearSuccess();
      clearError();
    }
  }, [success, clearSuccess, navigation, clearError]);

  return (
    <div
      className={`p-6 rounded-lg shadow ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }       max-w-5xl mx-auto 
        `}
    >
      <h2 className="mb-3 text-3xl">Create Blog</h2>
      <label htmlFor="title" className="mb-2">
        <span>Title</span>
      </label>
      <input
        id="title"
        name="title"
        type="text"
        className={`w-full p-2 mb-4 ${
          theme === "dark"
            ? "bg-gray-900 border-gray-400"
            : "bg-white border-gray-300"
        }    max-w-5xl mx-auto border outline-none 
        `}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="body " className="mb-2">
        <span className="">Body</span>
      </label>

      <ReactQuill
        id="body"
        modules={moule}
        theme="snow"
        value={body}
        onChange={setBody}
      />

      <button
        type="button"
        className={`px-4 py-2 mt-4 text-white rounded ${
          theme === "dark" ? "bg-blue-600" : "bg-blue-500"
        }`}
        onClick={handleUpdate}
      >
        {loading ? "Loading..." : "Update"}
      </button>
    </div>
  );
};

export default UpdateBlog;
