import express from "express";
import {
  allBlogs,
  deleteBlog,
  editBlog,
  postBlog,
  singleBlog,
  userBlogs,
  getBlogDetails,
  getRelatedBlogs,
  getCategoryBlog,
  search,
} from "../controllers/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const blogRouter = express.Router();

blogRouter.get("/", allBlogs);
blogRouter.get("/user-blogs", authMiddleware, userBlogs);
blogRouter.get("/single-blog/:blogId", singleBlog);
blogRouter.post("/blog-details", getBlogDetails);
blogRouter.post("/post-blog", authMiddleware, upload.single("file"), postBlog);
blogRouter.put(
  "/edit-blog/:blogId",
  authMiddleware,
  upload.single("file"),
  editBlog
);
blogRouter.delete("/delete-blog/:blogId", authMiddleware, deleteBlog);
blogRouter.get("/related-blogs/:category/:currentBlog", getRelatedBlogs);
blogRouter.get("/category-blogs/:category", getCategoryBlog);
blogRouter.get("/search", search);

export default blogRouter;
