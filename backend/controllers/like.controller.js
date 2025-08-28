import { getLikes, toggleLike } from "../services/like.service.js";

export const toggleLikeController = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const authorId = req.user._id;

    const result = await toggleLike(authorId, blogid);
    res.status(200).json(result);
  } catch (err) {
    next(err); // 🔥 global error handler will use createError
  }
};

export const getLikesController = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const result = await getLikes(blogid);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
