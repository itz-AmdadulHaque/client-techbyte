'use client'
import useAuth from "@/hooks/useAuth";
import React, { ReactNode } from "react";

function AuthCheck({
  children,
  className = "",
}: {
  children: ReactNode;
  className: string;
}) {
  const { auth } = useAuth();

  if (auth?.isLoading) {
    return <div>Loading...</div>;
  }

  return <div className={className}>{children}</div>;
}

export default AuthCheck;
