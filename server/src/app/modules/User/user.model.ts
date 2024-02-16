/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Make a static method for check user is exist or not by email
userSchema.statics.isUserExist = async function (email: string) {
  return await this.findOne({ email });
};

// Make a static method for check password is correct or not
userSchema.statics.isPasswordCorrect = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email });
  if (!user) return false;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const User = model<TUser, TUserModel>("User", userSchema);

export default User;
