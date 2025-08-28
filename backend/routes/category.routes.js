import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  showCategory,
  getSingleCategory,
} from "../controllers/categoty.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/", showCategory);
categoryRouter.post(
  "/add-category",
  authMiddleware,
  adminMiddleware,
  addCategory
);
categoryRouter.put(
  "/edit-category/:id",
  authMiddleware,
  adminMiddleware,
  editCategory
);
categoryRouter.get(
  "/single-category/:id",
  authMiddleware,
  adminMiddleware,
  getSingleCategory
);
categoryRouter.delete(
  "/delete-category/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

export default categoryRouter;
