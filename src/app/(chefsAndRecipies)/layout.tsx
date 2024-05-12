import type { Metadata } from "next";

import { type PropsWithChildren } from "react";

import ChefRecipesSidebar from "@/components/ChefRecipesSidebar";
import ChefRecipesFilterNav from "@/components/navbar/ChefRecipesFilterNav";

export const metadata: Metadata = {
  title: "Culinary Canvas",
  description: "Your Home For The Best Recipes",
};

const Layout = async ({ children }: PropsWithChildren) => {
  /*  const recipies: recipeType[] = await getRecipies();
  const chefs: chefType[] = await getAllChefs(); */

  return (
    <>
      {" "}
      <div className="flex flex-col gap-10 radial min-h-screen py-2.5 md:p-14 ">
        <ChefRecipesFilterNav />
        <div className="flex gap-20 justify-center">
          {children}
          <ChefRecipesSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
