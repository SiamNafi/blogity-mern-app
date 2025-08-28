import express from "express";
import {
  getCurrentUser,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google-login", googleLogin);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.put(
  "/update-profile",
  authMiddleware,
  upload.single("file"),
  updateProfile
);

authRouter.get("/me", authMiddleware, getCurrentUser);

export default authRouter;
