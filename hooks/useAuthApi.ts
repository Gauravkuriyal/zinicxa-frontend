import { useEffect } from "react";
import toast from "react-hot-toast";
import api from "./axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuthApi = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          toast.error("Please login.");
          logout();
          router.push("/login");
        }

        return Promise.reject(error);
      }
    );

    // cleanup (important!)
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  return api;
};
