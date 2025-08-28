import { uploadToCloudinary } from "../config/coudinary.js";
import {
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
} from "../dao/blog.dao.js";

export const uplaodBlog = async (data, userId, image) => {
  const cloudinaryRes = await uploadToCloudinary(image.path);
  const featuredImage = cloudinaryRes.secure_url;
  const blogData = { ...data, author: userId, featuredImage };
  const blog = await createBlog(blogData);
  return blog;
};

export const updateBlogService = async (blogid, data, image) => {
  let blogData = { ...data };

  // If user uploaded a new image
  if (image) {
    const coudinaryRes = await uploadToCloudinary(image.path);
    blogData.featuredImage = coudinaryRes.secure_url;
  }

  const updatedBlog = await updateBlog(blogid, blogData);
  return updatedBlog;
};

export const getAllBlogs = async () => {
  const blogs = await fetchAllBlogs();
  return blogs;
};

export const getUserBlogService = async (userId) => {
  return await getBlogByAuthorId(userId);
};

export const deleteBlogService = async (blogId) => {
  return await deleteBlogById(blogId);
};

export const fetchSingleBlogService = async (blogId) => {
  return await getSingleBlogById(blogId);
};

export const fetchBlogDetailsService = async (slug) => {
  const blog = await getBlogDetailsBySlug(slug);
  return blog;
};

export const getRelatedBlogsByCategoryService = async (
  category,
  currentBlog
) => {
  const blogs = await findRelatedBlogsByCategory(category, currentBlog);
  return blogs;
};

export const getBlogByCategoryService = async (category) => {
  const blogs = await fetBlogByCategory(category);
  return blogs;
};

export const getSearchedBlogsSearvice = async (q) => {
  const blogs = await fetchBlogBySearch(q);
  return blogs;
};
