import {
  uplaodBlog,
  getAllBlogs,
  getUserBlogService,
  deleteBlogService,
  fetchSingleBlogService,
  updateBlogService,
  fetchBlogDetailsService,
  getRelatedBlogsByCategoryService,
  getBlogByCategoryService,
  getSearchedBlogsSearvice,
} from "../services/blog.service.js";
import controllerWrapper from "../utils/controllerWrapper.js";

const allBlogs = controllerWrapper(async (req, res) => {
  const blogs = await getAllBlogs();
  res.status(200).json({
    blogs,
  });
});

const userBlogs = controllerWrapper(async (req, res) => {
  const userId = req.user._id;
  const blogs = await getUserBlogService(userId);
  res.status(200).json({
    success: true,
    blogs,
  });
});

const singleBlog = controllerWrapper(async (req, res) => {
  const blogId = req.params.blogId;
  const singleBlog = await fetchSingleBlogService(blogId);
  res.status(200).json({
    success: true,
    singleBlog,
  });
});

const postBlog = controllerWrapper(async (req, res) => {
  const userId = req.user._id;
  const data = JSON.parse(req.body.data);
  const image = req.file;
  const blog = await uplaodBlog(data, userId, image);
  res.status(200).json({ success: true, message: "Blog Posted" });
});

const editBlog = controllerWrapper(async (req, res) => {
  const blogId = req.params.blogId;
  const data = JSON.parse(req.body.data);
  const image = req.file;
  const updatedBlog = await updateBlogService(blogId, data, image);
  res.status(200).json({
    success: true,
    message: "Blog updated",
  });
});

const deleteBlog = controllerWrapper(async (req, res) => {
  const blogId = req.params.blogId;
  const deletedBlog = await deleteBlogService(blogId);
  res.status(200).json({
    success: true,
    message: "Blog Deleted",
  });
});

const getBlogDetails = controllerWrapper(async (req, res) => {
  const { slug } = req.body;
  const blog = await fetchBlogDetailsService(slug);
  res.status(200).json({ success: true, blog });
});

const getRelatedBlogs = controllerWrapper(async (req, res) => {
  const { category, currentBlog } = req.params;
  const blogs = await getRelatedBlogsByCategoryService(category, currentBlog);
  res.status(200).json({
    success: true,
    blogs,
  });
});

const getCategoryBlog = controllerWrapper(async (req, res) => {
  const { category } = req.params;
  const blogs = await getBlogByCategoryService(category);
  res.status(200).json({
    success: true,
    blogs,
  });
});

const search = controllerWrapper(async (req, res) => {
  const { q } = req.query;
  const blogs = await getSearchedBlogsSearvice(q);
  res.status(200).json(blogs);
});

export {
  allBlogs,
  userBlogs,
  singleBlog,
  postBlog,
  editBlog,
  deleteBlog,
  getBlogDetails,
  getRelatedBlogs,
  getCategoryBlog,
  search,
};
