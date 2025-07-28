"use client";

import type { Auth } from "@/Types/Types";
import { createContext } from "react";

type AuthContextType = {
  logOut: () => void;
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
