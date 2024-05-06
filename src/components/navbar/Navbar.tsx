import React from "react";
import Image from "next/image";
import Links from "./links/Links";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-black p-3 text-pink-500">
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
