// src/components/navbar/Navbar.tsx
"use client";
import React from "react";
import Image from "next/image";
import Links from "./links/Links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return null;
  }

  return (
    <div className="flex justify-between items-center bg-black p-3 text-pink-500 w-full">
      <Link href={"/"}>
        <Image
          src={"/logo.jpg"}
          alt="logo image"
          width={40}
          height={40}
          className="w-16 h-16 rounded-full"
        />
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
