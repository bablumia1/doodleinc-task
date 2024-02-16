import { Router } from "express";
import { loginUser, registerUser, userProfile } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth(), userProfile);

export const userRoutes = router;
