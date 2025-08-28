import { uploadToCloudinary } from "../config/coudinary.js";
import {
  createUser,
  createUserGoogle,
  findUserByEmail,
  findUserById,
  updateUserById,
} from "../dao/user.dao.js";
import { createError } from "../utils/erroHandler.js";
import { singToken } from "../utils/helper.js";
import { comparePassword, hashPassowrd } from "../utils/password.utils.js";

const saveUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw createError(409, "User already exist");
  }
  const newUser = await createUser(name, email, password);
  const token = await singToken({ id: newUser._id });
  return { token, newUser };
};

const saveUserGoogle = async (name, email, avatar) => {
  let user = await findUserByEmail(email);
  if (!user) {
    user = await createUserGoogle(name, email, avatar);
  }

  const token = await singToken({ id: user._id });
  return { user, token };
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw createError(401, "Invalid login credentials");
  }
  const compare = await comparePassword(password, user.password);
  if (!compare) {
    throw createError(401, "Invalid login credentials");
  }
  const token = await singToken({ id: user._id });
  return { token, user };
};

const updateUserProfile = async (
  { name, email, password, bio },
  userId,
  avatar
) => {
  const user = await findUserById(userId);
  if (!user) {
    throw createError(404, "User not found");
  }
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (bio) updateData.bio = bio;
  if (password) updateData.password = await hashPassowrd(password);

  if (avatar) {
    const cloudinaryRes = await uploadToCloudinary(avatar.path);
    updateData.avatar = cloudinaryRes.secure_url;
  }
  return await updateUserById(userId, updateData);
};

export { saveUser, login, saveUserGoogle, updateUserProfile };
