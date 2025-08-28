import axiosInstance from "@/lib/axiosInstance";
const postComment = async (commentData) => {
  const { data } = await axiosInstance.post(
    "/api/comment/add-comment",
    commentData
  );
  return data;
};

const fetchComments = async (blogid) => {
  const { data } = await axiosInstance(`/api/comment/all-comments/${blogid}`);
  return data;
};

const getAllComments = async () => {
  const { data } = await axiosInstance("/api/comment/get-all-comment");
  return data;
};

const deleteComment = async (commentid) => {
  const { data } = await axiosInstance.delete(
    `/api/comment/delete/${commentid}`
  );
  return data;
};

export { postComment, fetchComments, getAllComments, deleteComment };
