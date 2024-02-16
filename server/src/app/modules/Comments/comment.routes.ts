import { Router } from "express";
import {
  createComment,
  deleteComment,
  listComment,
  updateComment,
} from "./comment.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/:blogId/create", auth(), createComment);
router.patch("/:commentId", auth(), updateComment);
router.delete("/:commentId", auth(), deleteComment);
router.get("/:blogId", listComment);

export const commentRoutes = router;
