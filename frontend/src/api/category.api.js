import axiosInstance from "@/lib/axiosInstance";

const addCategory = async (values) => {
  const { data } = await axiosInstance.post(
    "/api/category/add-category",
    values
  );
  return data;
};

const getAllCategory = async () => {
  const { data } = await axiosInstance.get("/api/category");
  return data;
};

const singleCategory = async (id) => {
  const { data } = await axiosInstance.get(
    `/api/category/single-category/${id}`
  );
  return data;
};

const editCategory = async (values, id) => {
  const { data } = await axiosInstance.put(
    `/api/category/edit-category/${id}`,
    values
  );
  return data;
};

const deleteCategory = async (id) => {
  const { data } = await axiosInstance.delete(
    `/api/category/delete-category/${id}`
  );
  return data;
};

export {
  addCategory,
  getAllCategory,
  singleCategory,
  editCategory,
  deleteCategory,
};
