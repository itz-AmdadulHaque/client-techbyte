"use client";

import axios from "@/config/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/auth/refreshToken", {
      withCredentials: true,
    });

    return response?.data?.data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
