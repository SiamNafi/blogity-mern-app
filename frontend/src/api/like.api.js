import axiosInstance from "@/lib/axiosInstance";

export const toggleLike = async (blogid) => {
  const res = await axiosInstance.post(`/api/like/${blogid}/toggle`);
  return res.data;
};

export const getLikes = async (blogid) => {
  const res = await axiosInstance.get(`/api/like/${blogid}`);
  return res.data;
};
