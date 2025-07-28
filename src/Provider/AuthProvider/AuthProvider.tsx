"use client";

import type { Auth } from "@/Types/Types";
import { AuthContext } from "./auth-context";
import {  useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const initialState = { user: null, accessToken: null, isLoading: true };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth>(initialState);
  const router = useRouter()

  const logOut = () => {
    setAuth({
      user:null,
      accessToken:null,
      isLoading: false
    });

    router.push('/login')
  };

  const authInfo = {
    logOut,
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
