import config from "@/config";
import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  // add header if we want to send token inside authorization header
  // headers: {
  //   Authorization:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc3NWExYjBjOTIzY2UxZWY4ZTQ4ZjIiLCJlbWFpbCI6Im1kLmFzaWYuODM5M0BnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NDgyMjYwOSwiZXhwIjoxNzU1Njg2NjA5fQ.CKSs1JW393cSC-lXDnnCgiSjOkUsSpyzme9gGbh9dU8",
  // },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // console.log("Axio", config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;

// temporary storage where store request come inside isRefreshing time
let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

// resolve or reject all pendingQueue
const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  // empty after all resolve and reject
  pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // return response if all ok
  (response) => {
    return response;
  },
  // if error found then go inside it
  async (error) => {
    // failed request come from axios like /auth/me store in originalRequest
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      console.log("Your token is expired");

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New Token arrived", res);

        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    //* For Everything
    return Promise.reject(error);
  }
);
