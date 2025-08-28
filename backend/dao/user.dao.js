import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import User from "../models/user.model.js";
import { hashPassowrd } from "../utils/password.utils.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
const findUserById = async (id) => {
  return await User.findById(id);
};
const createUser = async (name, email, password) => {
  const hashedPassowrd = await hashPassowrd(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassowrd,
  });
  await newUser.save();
  return newUser;
};
const createUserGoogle = async (name, email, avatar) => {
  const password = "***********";
  const newUser = new User({
    name,
    email,
    password,
    avatar,
  });
  await newUser.save();
  return newUser;
};

const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// user info and related actions for admin only

const fetchAllUsers = async () => {
  return await User.find();
};
const deleteUserById = async (userid) => {
  // delete all likes by the user
  await Like.deleteMany({ author: userid });

  // delete all comments by the user
  await Comment.deleteMany({ author: userid });

  // finally delete the user
  return await User.findByIdAndDelete(userid);
};

export {
  findUserByEmail,
  updateUserById,
  findUserById,
  createUser,
  createUserGoogle,
  fetchAllUsers,
  deleteUserById,
};
