import express, { Application } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import { userRoutes } from "./app/modules/User/user.routes";
import globalErrorHandler from "./app/middlewares/globalErrorGandler";
import { blogRoutes } from "./app/modules/Blog/blog.routes";
import { commentRoutes } from "./app/modules/Comments/comment.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Application routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);

// Middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
