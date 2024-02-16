import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// check if title already exists
blogSchema.path("title").validate(async (title: string) => {
  const titleCount = await Blog.countDocuments({ title });
  return !titleCount;
}, "This title already exists! Please try another title.");

const Blog = model<TBlog>("Blog", blogSchema);

export default Blog;
