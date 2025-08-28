import axiosInstance from "@/lib/axiosInstance";

const postBlog = async (formData) => {
  const { data } = await axiosInstance.post("/api/blog/post-blog", formData);
  return data;
};

const getAllBlogs = async () => {
  const { data } = await axiosInstance("/api/blog");
  return data;
};

const getUserBlogs = async () => {
  const { data } = await axiosInstance("/api/blog/user-blogs");
  return data;
};

const deleteBlog = async (id) => {
  const { data } = await axiosInstance.delete(`/api/blog/delete-blog/${id}`);
  return data;
};

const getSingleBlog = async (id) => {
  const { data } = await axiosInstance.get(`/api/blog/single-blog/${id}`);
  return data;
};

const updateBlog = async (formData, id) => {
  const { data } = await axiosInstance.put(
    `/api/blog/edit-blog/${id}`,
    formData
  );
  return data;
};

const getBlogDetails = async (slug) => {
  const { data } = await axiosInstance.post("/api/blog/blog-details", { slug });
  return data;
};

const getRelatedBlogs = async (category, blog) => {
  const { data } = await axiosInstance(
    `/api/blog/related-blogs/${category}/${blog}`
  );
  return data;
};

const getBlogsByCategory = async (category) => {
  const { data } = await axiosInstance(`/api/blog/category-blogs/${category}`);
  return data;
};

const getBlogBySearch = async (q) => {
  const { data } = await axiosInstance(`/api/blog/search?q=${q}`);
  return data;
};

export {
  postBlog,
  getAllBlogs,
  getUserBlogs,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  getBlogDetails,
  getRelatedBlogs,
  getBlogsByCategory,
  getBlogBySearch,
};
