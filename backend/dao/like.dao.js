import Like from "../models/like.model.js";

export const findLike = async (author, blogid) => {
  return await Like.findOne({ author, blogid });
};

export const createLike = async (author, blogid) => {
  return await Like.create({ author, blogid });
};
export const deleteLike = async (authorId, blogid) => {
  return await Like.findOneAndDelete({ author: authorId, blogid });
};

export const getLikesByBlog = async (blogid) => {
  return await Like.find({ blogid });
};
