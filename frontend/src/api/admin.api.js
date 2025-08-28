import axiosInstance from "@/lib/axiosInstance";

const getAllUser = async () => {
  const { data } = await axiosInstance("/api/user");
  return data;
};

const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/api/user/delete-user/${id}`);
  return data;
};

export { getAllUser, deleteUser };
