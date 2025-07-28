// components/Navbar.tsx
"use client";

import { Home, Boxes, Grid3x3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import NavUser from "./NavUser";

const navItems = [
  { label: "Home", href: "/", icon: <Home size={20} /> },
  { label: "Products", href: "/products", icon: <Boxes size={20} /> },
  { label: "Categories", href: "/categories", icon: <Grid3x3 size={20} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  console.log("in nav user");
  const { data } = useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/client");
      setAuth((prev) => {
        return {
          ...prev,
          user: res.data.data,
          isLoading: false,
        };
      });
      return res.data;
    },
  });

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="hidden md:flex justify-between items-center px-6 py-4 shadow-md bg-white fixed top-0 left-0 right-0 z-50">
        <div className="text-xl font-bold">ShopEase</div>
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "text-sm font-medium hover:text-blue-600",
                  pathname === item.href && "text-blue-600 font-semibold"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {auth?.user ? (
            <NavUser user= {auth.user}/>
          ) : (
            <li>
              <Link
                href="/login"
                className={clsx(
                  "text-sm font-medium hover:text-blue-600",
                  pathname === "login" && "text-blue-600 font-semibold"
                )}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t z-50">
        <ul className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "flex flex-col items-center text-xs",
                  pathname === item.href ? "text-blue-600" : "text-gray-500"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spacer for layout */}
      <div className="h-16 md:h-20" />
    </>
  );
}
