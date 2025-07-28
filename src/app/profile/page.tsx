"use client";
import AuthCheck from "@/components/custom/AuthCheck";
import useAuth from "@/hooks/useAuth";
import React from "react";

function Profile() {
  const { auth } = useAuth();
  return (
    <AuthCheck className="text-red-500">
      <h1>{auth.user?.firstName}</h1>
      <h1>{auth.user?.lastName}</h1>
    </AuthCheck>
  );
}

export default Profile;
