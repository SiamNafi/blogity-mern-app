import {
  createComment,
  fetchAllComments,
  fetchBlogCommentsByBlogId,
  deleteCommentById,
} from "../dao/comment.dao.js";

const postCommentService = async (author, blogid, comment) => {
  const newComment = { author, blogid, comment };
  const commentData = await createComment(newComment);
  return commentData;
};

const getCommentsService = async (blogid) => {
  const comments = await fetchBlogCommentsByBlogId(blogid);
  return comments;
};

const getAllCommentsService = async (userid) => {
  const comments = await fetchAllComments(userid);
  return comments;
};

const deleteCommnetByIdService = async (commentid) => {
  const result = await deleteCommentById(commentid);
  return result;
};

export {
  postCommentService,
  getCommentsService,
  getAllCommentsService,
  deleteCommnetByIdService,
};
