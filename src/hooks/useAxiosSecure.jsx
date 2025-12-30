import axios from "axios";
import { useMemo } from "react";

const useAxiosSecure = () => {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://chatflow-studio-server.vercel.app",
      withCredentials: true,
    });

    instance.interceptors.response.use(
      res => res,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Unauthorized or forbidden");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
