import type { Metadata } from "next";

import { type PropsWithChildren } from "react";

import ChefRecipiesSideBar from "@/components/chefsRecipiesSideBar";
import ChefsRecipiesFilterNav from "@/components/navbar/chefsRecipiesFilterNav";

export const metadata: Metadata = {
  title: "Culinary Canvas",
  description: "Your Home For The Best Recipes",
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-10 radial min-h-screen p-14 ">
        <ChefsRecipiesFilterNav />
        <div className="flex gap-20">
          {children}
          <ChefRecipiesSideBar />
        </div>
      </div>
    </>
  );
};

export default Layout;
