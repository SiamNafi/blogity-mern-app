// axiosInstance.js
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "@/store";
import { removeUser } from "@/redux/user/user.slice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong!";

    if (error.response) {
      // ✅ Take message from backend if available
      message =
        error.response.data?.message || `Error: ${error.response.status}`;

      if (error.response.status === 401) {
        store.dispatch(removeUser());
        toast.error("Please Login Again");
      }
    } else if (error.request) {
      // No response received from server
      message = "No response from server. Please check your connection.";
    } else {
      // Something happened before sending the request
      message = error.message;
    }

    // ✅ Show backend's message in toast
    toast.error(message);
    console.error("Axios Error:", message);

    return Promise.reject(message);
  }
);

export default axiosInstance;
