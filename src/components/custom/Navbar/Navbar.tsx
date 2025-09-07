"use client";

import { Home, ShoppingCart, ShoppingBag, Monitor, Smartphone, Laptop, Store, Tags, Wrench, Briefcase, Package, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import NavUser from "./NavUser";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { NavbarDrawer } from "./NavbarDrawer";
import { NavItemType } from "@/Types/ComponentTypes";
import SearchBar from "./SearchBar";
import ModeToggle from "@/components/theme/mode-toggler";
import Image from "next/image";
import CartInfo from "../CartInfo/CartInfo";
import { Suspense } from "react";

const navItems: NavItemType[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home size={20} />
  },
  {
    label: "Shop",
    icon: <ShoppingBag size={20} />,
    links: [
      {
        label: "Electronics",
        href: "/electronics",
        icon: <Monitor size={20} />
      },
      {
        label: "Smartphones",
        href: "/smartphones",
        icon: <Smartphone size={20} />
      },
      {
        label: "Laptops",
        href: "/laptops",
        icon: <Laptop size={20} />
      },
      {
        label: "Home Appliances",
        href: "/home-appliances",
        icon: <Store size={20} />
      },
    ]
  },
  {
    label: "Services",
    href: "/services",
    icon: <Wrench size={20} />
  },
  {
    label: "Consultants",
    href: "/consultants",
    icon: <Briefcase size={20} />,
  },
  {
    label: "Request Product",
    href: "/request-product",
    icon: <Package2 size={20} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();



  const { data } = useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {


      const res = await axiosPrivate.get("/customer");
      setAuth((prev) => {
        return {
          ...prev,
          user: res.data.data,
          isLoading: false,
        };
      });
      return res.data;
    },
    enabled: !auth.user,
  });

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="shadow-md fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black text-white">

        <div className="flex justify-between items-center px-1 lg:px-6 py-4 container mx-auto">


          <div className="flex items-center gap-4">

            <NavbarDrawer navItems={navItems} />

            <Image src="/logo.png" alt="TechVibe" width={100} height={100} className="w-12 rounded-md" />



            <h2 className=" hidden xl:block text-xl font-bold">TechVibe</h2>

          </div>


          <ul className="hidden lg:flex gap-8 items-center">


            {navItems.map((item) => (
              <li key={item.href || item.label}>
                {item.links ? (
                  <NavigationMenu key={item.label}>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2 p-2">
                          {item.links.map((subItem) => (
                            <li key={subItem.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href!}
                                  className="flex items-center gap-2 text-sm hover:text-primary"
                                >
                                  {/* {subItem.icon && <subItem.icon className="h-4 w-4" />} */}
                                  {subItem.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenu>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={clsx(
                      "text-sm font-medium hover:text-blue-600",
                      pathname === item.href && "text-blue-600 font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}


          </ul>

          <div className="flex items-center gap-4">

            <Suspense>
              <SearchBar />
            </Suspense>

            <CartInfo className="hidden lg:block" />

            <div className="hidden lg:block">
              <ModeToggle />
            </div>

            {auth?.user ?
              (
                <NavUser user={auth.user} />
              )
              :
              (

                <Link
                  href="/login"
                  className={clsx(
                    "text-sm font-medium hover:text-blue-600",
                    pathname === "login" && "text-blue-600 font-semibold"
                  )}
                >
                  Login
                </Link>

              )}

          </div>

        </div >
      </nav >

      {/* Mobile Bottom Navbar */}
      < nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t z-50" >
        <ul className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href || "#"}
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
      </nav >

      {/* Spacer for layout */}
      < div className="h-16 md:h-20" />
    </>
  );
}
