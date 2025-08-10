import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  // headers: {
  //   Authorization:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc3NWExYjBjOTIzY2UxZWY4ZTQ4ZjIiLCJlbWFpbCI6Im1kLmFzaWYuODM5M0BnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NDgyMjYwOSwiZXhwIjoxNzU1Njg2NjA5fQ.CKSs1JW393cSC-lXDnnCgiSjOkUsSpyzme9gGbh9dU8",
  // },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    console.log("Axio", config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Axio", response);
    return response;
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
