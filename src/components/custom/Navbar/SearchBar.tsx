"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();



  const [query, setQuery] = useState("");

  useEffect(() => {
    if (pathname.startsWith("/products/")) {
      setQuery(decodeURIComponent(pathname.split("/")[2]?.split("?")[0] || ""));
    } else {
      setQuery(""); // Clear when not on search page
    }
  }, [pathname]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex">

      <Input
        type="search"
        placeholder="Search Products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="ml-3 p-3 min-w-28 max-w-96"
      />
      <Button
        onClick={handleSearch}
        className="md:ml-2"
        variant="default"
      >
        <Search strokeWidth={2.5} size={32} className=" h-4 w-4" />
      </Button>
    </div>
  );
}
