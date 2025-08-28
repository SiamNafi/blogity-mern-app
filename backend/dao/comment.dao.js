import Comment from "../models/comment.model.js";
import { findUserById } from "./user.dao.js";

const createComment = async (data) => {
  const newComment = new Comment({
    ...data,
  });
  return await newComment.save();
};

const fetchBlogCommentsByBlogId = async (blogid) => {
  return await Comment.find({ blogid })
    .populate("author", "name avatar")
    .lean()
    .exec();
};

const fetchAllComments = async (userid) => {
  const user = await findUserById(userid);
  if (user.role === "admin") {
    return await Comment.find()
      .populate("blogid", "title")
      .populate("author", "name")
      .lean()
      .exec();
  } else {
    return await Comment.find({ author: user._id })
      .populate("blogid", "title")
      .populate("author", "name")
      .lean()
      .exec();
  }
};

const deleteCommentById = async (commentid) => {
  return await Comment.findByIdAndDelete(commentid);
};

export {
  createComment,
  fetchBlogCommentsByBlogId,
  fetchAllComments,
  deleteCommentById,
};
