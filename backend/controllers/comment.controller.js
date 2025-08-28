import {
  postCommentService,
  getCommentsService,
  getAllCommentsService,
  deleteCommnetByIdService,
} from "../services/comment.service.js";
import controllerWrapper from "../utils/controllerWrapper.js";

const postComment = controllerWrapper(async (req, res) => {
  const author = req.user._id;
  const { blogid, comment } = req.body;
  const commentData = await postCommentService(author, blogid, comment);
  res.status(200).json({
    success: true,
    message: "Comment posted",
  });
});

const getBlogComments = controllerWrapper(async (req, res) => {
  const { blogid } = req.params;
  const comments = await getCommentsService(blogid);
  res.status(200).json({
    success: true,
    comments,
  });
});

const getAllComments = controllerWrapper(async (req, res) => {
  const userid = req.user._id;
  const comments = await getAllCommentsService(userid);
  res.status(200).json(comments);
});

const deleteComment = controllerWrapper(async (req, res) => {
  const { commentid } = req.params;
  const result = await deleteCommnetByIdService(commentid);
  res.status(200).json({
    success: true,
    message: "Comment Deleted",
  });
});

export { postComment, getBlogComments, getAllComments, deleteComment };
