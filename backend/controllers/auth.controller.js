import { cookieOptions } from "../config/cookieConfig.js";
import { findUserById } from "../dao/user.dao.js";
import {
  login,
  saveUser,
  saveUserGoogle,
  updateUserProfile,
} from "../services/auth.service.js";
import controllerWrapper from "../utils/controllerWrapper.js";

// Register a user
const registerUser = controllerWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, newUser } = await saveUser(name, email, password);
  const { password: _, ...user } = newUser.toObject()
    ? newUser.toObject()
    : newUser;
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user, success: true, message: "User registered successfully" });
});
// login a user
const loginUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await login(email, password);
  const { password: _, ...safeUser } = user.toObject() ? user.toObject() : user;
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user: safeUser, success: true, message: "Login successfull" });
});

//google login
const googleLogin = controllerWrapper(async (req, res) => {
  const { name, email, avatar } = req.body;
  const { token, user } = await saveUserGoogle(name, email, avatar);
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user, success: true, message: "User login successfully" });
});
// logout a user
const logoutUser = controllerWrapper(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
// get current user
const getCurrentUser = controllerWrapper(async (req, res) => {
  const user = req.user;
  const { password: _, ...safeuser } = user.toObject() ? user.toObject() : user;
  res.status(200).json({ success: true, user: safeuser });
});

// update user profile
const updateProfile = controllerWrapper(async (req, res) => {
  const userId = req.user._id;
  const avatar = req.file;
  const data = JSON.parse(req.body.data);
  const user = await updateUserProfile(data, userId, avatar);
  const { password: _, ...safeUser } = user.toObject() ? user.toObject() : user;
  res.status(200).json({
    user: safeUser,
    success: true,
    message: "Profile updated successfully",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  googleLogin,
  updateProfile,
};
