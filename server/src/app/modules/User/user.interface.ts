/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  password: string;
}

export interface TLoinUser {
  email: string;
  password: string;
}

export interface TUserModel extends Model<TUser> {
  isUserExist(email: string): Promise<boolean>;
  isPasswordCorrect(email: string, password: string): Promise<boolean>;
}
