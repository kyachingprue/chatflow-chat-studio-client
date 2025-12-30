import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
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
