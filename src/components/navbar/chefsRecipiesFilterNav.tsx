import React from "react";
import { Search } from "lucide-react";
import NavigationMenuDemo from "@/components/recipiesNav";

const ChefsRecipiesFilterNav = () => {
  return (
    <div className="hidden md:flex justify-between w-4/4">
      <NavigationMenuDemo />
      <div className="bg-black rounded-full text-white font-bold py-6 px-5 w-fit ml-auto flex gap-4">
        <Search className="font-bold" />
        <input
          type="text"
          placeholder="SEARCH"
          className="bg-transparent outline-none border-none text-white placeholder:text-white"
        />
      </div>
    </div>
  );
};

export default ChefsRecipiesFilterNav;
