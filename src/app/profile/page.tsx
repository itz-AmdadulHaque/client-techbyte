"use client";
import AuthCheck from "@/components/custom/AuthCheck";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProfileEditor from "./component/ProfileEditor";
import AddressEditor from "./component/AddressEditor";
import { useRouter, useSearchParams } from "next/navigation";
import ImageEditor from "./component/ImageEditor";

function Profile() {

  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";

  const router = useRouter();



  const { auth } = useAuth();

  const user = auth.user;


  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  return (
    <AuthCheck className="">
      <div className="min-h-screen container mx-auto p-12">

        <div className="flex justify-center items-center gap-6 md:mt-12">

          {/* {user?.image ?
            <Image
              src={user.image}
              width={100}
              height={100}
              alt={user.firstName}
              className="w-24 h-24 rounded-full object-cover"
            />


            :
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          } */}

          <ImageEditor />


          <div className="p-8">

            <h2 className="font-bold text-2xl my-2" >{user?.firstName} {user?.lastName}</h2>
            <h3>{user?.phone || user?.email}</h3>


          </div>

        </div>


        <div className="mt-12">
          <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>

            <TabsList className="w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>

              <TabsTrigger value="address">Address</TabsTrigger>

              <TabsTrigger value="password">Password</TabsTrigger>

              <TabsTrigger value="orders">Orders</TabsTrigger>

              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileEditor />
            </TabsContent>

            <TabsContent value="address">
              <AddressEditor />
            </TabsContent>

            <TabsContent value="password">
              hello
            </TabsContent>

            <TabsContent value="orders">
              hello
            </TabsContent>


            <TabsContent value="requests">
              hello
            </TabsContent>
          </Tabs>

        </div>

      </div>
    </AuthCheck>
  );
}

export default Profile;
