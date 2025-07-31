'use client'
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

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
    return <div>Loading...</div>;
  }

  if (!auth?.accessToken || !auth?.user) {
    // Prevent rendering protected content during redirect
    return null;
  }

  return <div className={className}>{children}</div>;
}

export default AuthCheck;
