import React from "react";
import { getAllChefs, getRecipies } from "@/lib/actions";
import { recipeType, chefType } from "../schema/recipe";
import Recipy_card from "@/components/recipy_card";
import Popular_chef_card from "@/components/popular_chefs_card";
import Popular_recipe_card from "@/components/popular_recipe-card";
import { Search } from "lucide-react";
import NavigationMenuDemo from "@/components/recipiesNav";

const Recipies = async () => {
  const recipies: recipeType[] = await getRecipies();
  const chefs: chefType[] = await getAllChefs();

  return (
    <div className="flex flex-col radial min-h-screen gap-10 p-14 relative">
      {/* Filter nav */}
      <div className="flex justify-between w-4/4">
        <NavigationMenuDemo />
        <div className="bg-black rounded-full  text-white font-bold py-6 px-5 w-fit ml-auto flex gap-4">
          <Search className="font-bold" />
          <input
            type="text"
            placeholder="SEARCH"
            className="bg-transparent outline-none border-none text-white placeholder:text-white"
          />
        </div>
      </div>

      <div className="flex gap-20">
        <section className="w-100 flex flex-col gap-10 w-3/4 text-white font-bold">
          <p>
            You have <span className="text-black">{recipies.length}</span> to
            explore
          </p>

          <div className="grid-cols-3 grid gap-5">
            {recipies.map((recipe) => (
              <Recipy_card recipe={recipe} key={recipe.id} />
            ))}
          </div>
        </section>

        <section className=" w-1/4 flex flex-col gap-10 sticky-side-bar height">
          <p></p>
          <div className="p-5 rounded-lg text-white bg-black flex flex-col gap-3 h-auto w-100">
            <h2 className="font-bold text-pink-500 text-xl">
              Most popular Chefs
            </h2>
            <div className="flex flex-col gap-4">
              {chefs.slice(0, 3).map((chef) => (
                <Popular_chef_card chef={chef} key={chef.id} />
              ))}
            </div>
          </div>
          <div className="p-5 rounded-lg text-white bg-black flex flex-col gap-3 h-auto w-100">
            <h2 className="font-bold text-pink-500 text-xl">
              Trending Recipies
            </h2>
            <div className="flex flex-col gap-4">
              {recipies.slice(7, 10).map((recipe) => (
                <Popular_recipe_card recipe={recipe} key={recipe.id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Recipies;
