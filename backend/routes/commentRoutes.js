import express from "express";
import {
  deleteComment,
  getAllComments,
  getBlogComments,
  postComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment", authMiddleware, postComment);
commentRouter.get("/all-comments/:blogid", getBlogComments);
commentRouter.get("/get-all-comment", authMiddleware, getAllComments);
commentRouter.delete("/delete/:commentid", authMiddleware, deleteComment);

export default commentRouter;
