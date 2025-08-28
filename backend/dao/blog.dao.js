import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import { createError } from "../utils/erroHandler.js";
import { findUserById } from "./user.dao.js";

const createBlog = async (data) => {
  const newBlog = new Blog(data);
  await newBlog.save();
  return newBlog;
};

const updateBlog = async (blogid, updatedData) => {
  const exist = await Blog.findById(blogid);
  if (!exist) {
    throw createError(404, "Blog not found");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(blogid, updatedData);
  return updatedBlog;
};

const fetchAllBlogs = async () => {
  const blogs = await Blog.find()
    .populate("author", "name avatar role")
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
  return blogs;
};

const getBlogByAuthorId = async (userId) => {
  const user = await findUserById(userId);
  if (user.role === "admin") {
    return await Blog.find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }
  return await Blog.find({ author: userId })
    .populate("author", "name")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
};

const deleteBlogById = async (blogId) => {
  return await Blog.findByIdAndDelete(blogId);
};

const getSingleBlogById = async (id) => {
  return await Blog.findById(id)
    .populate("category", "name")
    .populate("author", "name role");
};

const getBlogDetailsBySlug = async (slug) => {
  return await Blog.findOne({ slug })
    .populate("author", "name avatar role")
    .populate("category", "name slug");
};

const findRelatedBlogsByCategory = async (slug, currentBlog) => {
  const category = await Category.findOne({ slug });
  if (!category) return [];
  return await Blog.find({
    category: category._id,
    slug: { $ne: currentBlog },
  }).populate("category");
};

const fetBlogByCategory = async (slug) => {
  const category = await Category.findOne({ slug });
  if (!category) return [];
  return await Blog.find({ category: category._id })
    .populate("category", "name slug")
    .populate("author", "name avatar")
    .lean()
    .exec();
};

const fetchBlogBySearch = async (q) => {
  const blogs = await Blog.find({
    title: { $regex: q, $options: "i" },
  })
    .populate("author", "name avatar role")
    .populate("category", "name slug")
    .lean()
    .exec();
  return blogs;
};

export {
  createBlog,
  fetchAllBlogs,
  getBlogByAuthorId,
  deleteBlogById,
  getSingleBlogById,
  updateBlog,
  getBlogDetailsBySlug,
  findRelatedBlogsByCategory,
  fetBlogByCategory,
  fetchBlogBySearch,
};
