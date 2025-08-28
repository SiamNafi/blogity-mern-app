import express from "express";
import { getAllUser, deleteUser } from "../controllers/user.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, adminMiddleware, getAllUser);
userRouter.delete(
  "/delete-user/:userid",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

export default userRouter;
