"use client";

import type { Auth } from "@/Types/Types";
import { AuthContext } from "./auth-context";
import { useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const initialState = { user: null, accessToken: null, isLoading: true };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logOut = () => {
    setIsLoading(true);
    setAuth({
      user: null,
      accessToken: null,
      isLoading: false,
    });
    setIsLoading(false);
    // router.push("/")
  };

  const { data } = useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {
      console.log("getting user");
      const res = await axios.get("/customer"); // ✅ use plain axios here
      setAuth((prev) => ({
        ...prev,
        user: res.data.data,
        isLoading: false,
      }));
      return res.data;
    },
    enabled: !auth.user, // only run if no user in state
  });

  const authInfo = {
    logOut,
    auth,
    setAuth,
    setIsLoading,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
