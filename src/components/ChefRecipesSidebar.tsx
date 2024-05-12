"use client";
import React from "react";
import PopularChefCard from "./PopularChefCard";
import PopularRecipeCard from "./PopularRecipeCard";
import { usePathname } from "next/navigation";
import { useDataContext } from "@/app/store/data-context";

const ChefRecipesSidebar = () => {
    const { chefs, recipies } = useDataContext();

    const pathName = usePathname();

    return (
        <section className="flex-col w-1/4 min-w-[290px] md:flex gap-10 sticky top-5 h-screen overflow-hidden hidden">
            <div className="p-5 rounded-lg text-white bg-black flex flex-col gap-3">
                <h2 className="font-bold text-pink-500 text-xl">Most Popular Chefs</h2>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[220px]">
                    {chefs.slice(0, 3).map((chef) => (
                        <PopularChefCard chef={chef} key={chef.id}/>
                    ))}
                </div>
            </div>
            <div
                className={`p-5 rounded-lg text-white bg-black flex flex-col gap-3 ${
                    pathName === "/recipies" ? "order-first" : ""
                }`}
            >
                <h2 className="font-bold text-pink-500 text-xl">Trending Recipies</h2>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[220px]">
                    {recipies.slice(7, 10).map((recipe) => (
                        <PopularRecipeCard recipe={recipe} key={recipe.id}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChefRecipesSidebar;
