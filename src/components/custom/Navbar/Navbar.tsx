"use client";

import { Home, Grid3x3, Search, ShoppingCart, ShoppingBag, Monitor, Smartphone, Laptop, Store, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import NavUser from "./NavUser";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { NavbarDrawer } from "./NavbarDrawer";
import { NavItemType } from "@/Types/ComponentTypes";

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
    label: "Brands",
    href: "/brands",
    icon: <Grid3x3 size={20} />
  },
  {
    label: "Categories",
    href: "/categories",
    icon: <Tags size={20} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();


  const { data } = useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {

      console.log("calling client info");
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
      <nav className="shadow-md fixed top-0 left-0 right-0 z-50">

        <div className="flex justify-between items-center px-6 py-4 container mx-auto">


          <div className="flex items-center gap-4">
            <NavbarDrawer navItems={navItems} />

            <h2 className="text-xl font-bold">TechByte</h2>

          </div>


          <ul className="hidden md:flex gap-8 items-center">


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

            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10"
              />
            </div>

            <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />

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
