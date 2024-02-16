import { useContext, useEffect } from "react";
import { BlogContext } from "../context";
import BlogList from "../components/List/BlogList";

const Home = () => {
  const { blogs, fetchBlogs, loading } = useContext(BlogContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs?.length > 0 ? (
        blogs?.map((blog) => (
          <BlogList
            key={blog._id + Math.random()}
            title={blog.title}
            body={blog.body}
            loading={loading}
            id={blog._id}
            isAuthor={false}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No Blogs</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
