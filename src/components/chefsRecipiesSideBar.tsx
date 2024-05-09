"use client";
import React from "react";
import Popular_chef_card from "./popular_chefs_card";
import Popular_recipe_card from "./popular_recipe-card";
import { usePathname } from "next/navigation";
import { useDataContext } from "@/app/store/data-context";

const ChefRecipiesSideBar = () => {
  const { chefs, recipies } = useDataContext();

  const pathName = usePathname();
  console.log(pathName);

  return (
    <section className="flex-col w-1/4 flex gap-10 sticky-side-bar height">
      <div className="p-5 rounded-lg text-white bg-black flex flex-col gap-3 h-auto w-100">
        <h2 className="font-bold text-pink-500 text-xl">Most popular Chefs</h2>
        <div className="flex flex-col gap-4">
          {chefs.slice(0, 3).map((chef) => (
            <Popular_chef_card chef={chef} key={chef.id} />
          ))}
        </div>
      </div>
      <div
        className={`p-5 rounded-lg text-white bg-black flex flex-col gap-3 h-auto w-100 ${
          pathName === "/recipies" && "order-first"
        }`}
      >
        <h2 className="font-bold text-pink-500 text-xl">Trending Recipies</h2>
        <div className="flex flex-col gap-4">
          {recipies.slice(7, 10).map((recipe) => (
            <Popular_recipe_card recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefRecipiesSideBar;
