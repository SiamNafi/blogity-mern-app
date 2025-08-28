import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getLikesController,
  toggleLikeController,
} from "../controllers/like.controller.js";

const likeRouter = express.Router();

// ✅ Toggle like/unlike a blog
likeRouter.post("/:blogid/toggle", authMiddleware, toggleLikeController);

// ✅ Get all likes for a blog
likeRouter.get("/:blogid", getLikesController);

export default likeRouter;
