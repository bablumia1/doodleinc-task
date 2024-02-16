import { FC, useContext } from "react";
import { ThemeContext } from "../../context";
import parse from "html-react-parser";
import AnimateSpin from "../AnimateSpin/AnimateSpin";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

interface PropsType {
  title: string;
  body?: string;
  loading?: boolean;
  id: string;
  isAuthor?: boolean;
  deleteBlog?: (id: string) => void;
}

const BlogList: FC<PropsType> = ({
  title,
  body = "",
  loading = false,
  id,
  deleteBlog,
  isAuthor,
}) => {
  const { theme } = useContext(ThemeContext);

  const truncatedTitle =
    title?.length > 30 ? `${title.slice(0, 30)}...` : title;
  const truncatedBody = body.length > 300 ? `${body.slice(0, 300)}...` : body;

  return (
    <>
      {loading ? (
        <AnimateSpin />
      ) : (
        <div
          className={`p-6 rounded-lg shadow mb-5 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          {title && (
            <Link to={`/blogs/${id}`}>
              <h2 className="mb-3 text-3xl">{truncatedTitle}</h2>
            </Link>
          )}
          <div>{body && parse(truncatedBody)}</div>
          <div className="flex items-center justify-between mt-6 space-x-5">
            {isAuthor && (
              <>
                <button
                  onClick={() => deleteBlog && deleteBlog(id)}
                  className="text-red-600"
                >
                  <FaTrashAlt />
                </button>

                <Link to={`/profile/blog-update/${id}`} className="">
                  <FaRegEdit />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogList;
