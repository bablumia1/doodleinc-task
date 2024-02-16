import { Types } from "mongoose";

export interface TBlog {
  title: string;
  body: string;
  userId: Types.ObjectId;
}
