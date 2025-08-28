import {
  createLike,
  deleteLike,
  findLike,
  getLikesByBlog,
} from "../dao/like.dao.js";
import { createError } from "../utils/erroHandler.js";

export const toggleLike = async (authorId, blogid) => {
  if (!blogid) throw createError(400, "Blog ID is required");

  const existingLike = await findLike(authorId, blogid);

  if (existingLike) {
    await deleteLike(authorId, blogid);
    return { message: "Unliked successfully" };
  } else {
    await createLike(authorId, blogid);
    return { message: "Liked successfully" };
  }
};

export const getLikes = async (blogid) => {
  if (!blogid) throw createError(400, "Blog ID is required");

  const likes = await getLikesByBlog(blogid);
  if (!likes || likes.length === 0) return;

  return {
    totalLikes: likes.length,
    likes,
  };
};
