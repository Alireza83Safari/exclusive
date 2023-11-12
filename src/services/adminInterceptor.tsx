import axios from "axios";
import toast from "react-hot-toast";

const adminAxios = axios.create({
  baseURL: "/api/v1/admin",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

adminAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

adminAxios.interceptors.response.use(
  function (response) {
    // You can modify the response config here if needed
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error?.response?.request?.responseURL !==
        "https://exclusive.iran.liara.run/api/v1/admin/is_authenticated"
    ) {
      toast.error("Unauthorized. Please log in.");
    }

    return Promise.reject(error);
  }
);

export { adminAxios };
