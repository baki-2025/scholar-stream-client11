import axios from "axios";
import { useEffect, useMemo } from "react";

import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Create axios instance only once
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token =
          user?.accessToken || localStorage.getItem("access-token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        // Auto logout for expired or invalid token
        if (
          (status === 401 || status === 403) &&
          window.location.pathname !== "/login"
        ) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]); // ❌ axiosSecure removed to avoid re-runs

  return axiosSecure;
};

export default useAxiosSecure;
