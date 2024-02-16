import { Types } from "mongoose";

export interface TComment {
  blogId: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  email: string;
  body: string;
}
