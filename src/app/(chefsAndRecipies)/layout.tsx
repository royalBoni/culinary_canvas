"use client";
//import type { Metadata } from "next";

import { type PropsWithChildren } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import ChefRecipesSidebar from "@/components/ChefRecipesSidebar";
import ChefRecipesFilterNav from "@/components/navbar/ChefRecipesFilterNav";
import { useQuery } from "@tanstack/react-query";
import { useDataContext } from "../store/data-context";

/* export const metadata: Metadata = {
  title: "Culinary Canvas",
  description: "Your Home For The Best Recipes",
}; */

const Layout = ({ children }: PropsWithChildren) => {
  const pathName = usePathname();
  const { addChefs, addRecipes, addLikes, addComments, addFollows } =
    useDataContext();

  const {
    data: recipeData,
    error: recipeError,
    isLoading: recipeIsLoading,
  } = useQuery({
    queryKey: ["recipeposts"],
    queryFn: () =>
      fetch("https://culinary-canvas-delta.vercel.app/api/recipe", {
        cache: "no-store",
      }).then((res) => res.json()),
    refetchInterval: 4000,
    retry: 5,
  });

  const {
    data: chefData,
    error: chefError,
    isLoading: chefIsLoading,
  } = useQuery({
    queryKey: ["chefposts"],
    queryFn: () =>
      fetch("https://culinary-canvas-delta.vercel.app/api/chef").then((res) =>
        res.json()
      ),
    refetchInterval: 4000,
    retry: 5,
  });

  const {
    data: likesData,
    error: likesError,
    isLoading: likesIsLoading,
  } = useQuery({
    queryKey: ["likesposts"],
    queryFn: () =>
      fetch("https://culinary-canvas-delta.vercel.app/api/likes").then((res) =>
        res.json()
      ),
    refetchInterval: 4000,
    retry: 5,
  });

  const {
    data: commentData,
    error: commentError,
    isLoading: commentIsLoading,
  } = useQuery({
    queryKey: ["commentposts"],
    queryFn: () =>
      fetch("https://culinary-canvas-delta.vercel.app/api/comment").then(
        (res) => res.json()
      ),
    refetchInterval: 4000,
    retry: 5,
  });

  const {
    data: followData,
    error: followError,
    isLoading: followIsLoading,
  } = useQuery({
    queryKey: ["followposts"],
    queryFn: () =>
      fetch("https://culinary-canvas-delta.vercel.app/api/follow").then((res) =>
        res.json()
      ),
    refetchInterval: 4000,
    retry: 5,
  });

  addRecipes(recipeData);
  addChefs(chefData);
  addLikes(likesData);
  addComments(commentData);
  addFollows(followData);

  return (
    <>
      {" "}
      <div className="flex flex-col gap-10 radial min-h-screen py-2.5 md:p-14 ">
        {pathName === "/recipies" && <ChefRecipesFilterNav />}

        <div className="flex gap-20 justify-center">
          {children}
          <ChefRecipesSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
