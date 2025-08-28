import { deleteUserById, fetchAllUsers } from "../dao/user.dao.js";

const getAllUserService = async () => {
  const users = await fetchAllUsers();
  return users;
};

const deleteUserService = async (userid) => {
  const result = await deleteUserById(userid);
  return result;
};

export { getAllUserService, deleteUserService };
