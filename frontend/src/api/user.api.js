import axiosInstance from "@/lib/axiosInstance";
const registerUser = async ({ name, email, password }) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

const loginUser = async (values) => {
  const { data } = await axiosInstance.post("/api/auth/login", values);
  return data;
};

const googleLogin = async (values) => {
  const { data } = await axiosInstance.post("/api/auth/google-login", values);
  return data;
};

const logoutUser = async () => {
  const { data } = await axiosInstance.post("/api/auth/logout");
  return data;
};

const getUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/me");
  return data;
};

const updateUser = async (formData) => {
  const { data } = await axiosInstance.put(
    "/api/auth/update-profile",
    formData
  );
  return data;
};

export {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser,
  getUser,
  updateUser,
};
