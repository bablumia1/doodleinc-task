/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../http";
import { TUser } from "../types/TUser";

const register = async (data: TUser) => {
  return http.post("/auth/register", data);
};

const login = (data: Partial<TUser>) => {
  return http.post("/auth/login", data);
};

const profile = () => {
  return http.get("/auth/profile");
};

export const authServices = {
  register,
  login,
  profile,
};
