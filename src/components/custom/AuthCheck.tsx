'use client'
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { LoadingOverlay } from "./LoadingOverlay/LoadingOverlay";

function AuthCheck({
  children,
  className = "",
}: {
  children: ReactNode;
  className: string;
}) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isLoading && (!auth?.accessToken || !auth?.user)) {
      router.push("/login");
    }
  }, [auth, router]);

  if (auth?.isLoading) {
    return <LoadingOverlay visible blur />;
  }

  if (!auth?.accessToken || !auth?.user) {
    
    return null;
  }

  return <div className={className}>{children}</div>;
}

export default AuthCheck;
