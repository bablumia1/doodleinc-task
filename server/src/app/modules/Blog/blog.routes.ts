import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  detailBlog,
  listBlog,
  updateBlog,
} from "./blog.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/create", auth(), createBlog);
router.get("/", listBlog);
router.get("/:id", detailBlog);
router.patch("/:id", auth(), updateBlog);
router.delete("/:id", auth(), deleteBlog);

export const blogRoutes = router;
