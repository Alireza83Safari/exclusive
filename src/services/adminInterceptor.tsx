import axios from "axios";
import toast from "react-hot-toast";

const adminAxios = axios.create({
  baseURL: "https://eshop-bak.liara.run/api/v1/admin/",
  withCredentials: true,
});

adminAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

adminAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error?.response?.request?.responseURL !==
        "https://eshop-bak.liara.run/api/v1/admin/is_authenticated"
    ) {
      localStorage.removeItem("Authorization");
      toast.error("Unauthorized. Please log in.");
    }

    return Promise.reject(error);
  }
);

export { adminAxios };
