import {
  deleteUserService,
  getAllUserService,
} from "../services/user.service.js";
import controllerWrapper from "../utils/controllerWrapper.js";

const getAllUser = controllerWrapper(async (req, res) => {
  const users = await getAllUserService();
  res.status(200).json(users);
});

const deleteUser = controllerWrapper(async (req, res) => {
  const { userid } = req.params;
  const result = await deleteUserService(userid);
  res.status(200).json({
    success: true,
    message: "User Deleted",
  });
});

export { getAllUser, deleteUser };
