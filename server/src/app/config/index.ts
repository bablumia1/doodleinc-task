import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRED_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRED_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME,
};
