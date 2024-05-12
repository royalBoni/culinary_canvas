"use client";

import React from "react";
import { linkType } from "../Links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }: { item: linkType }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      key={item.title}
      className={`p-5 rounded-full hover:bg-pink-500 text-white ${
        pathName === item.path && "bg-pink-500 text-white"
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
