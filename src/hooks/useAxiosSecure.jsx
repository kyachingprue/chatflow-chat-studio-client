import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://chatflow-studio-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.response.use(
    res => res,
    error => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("Unauthorized or forbidden");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
