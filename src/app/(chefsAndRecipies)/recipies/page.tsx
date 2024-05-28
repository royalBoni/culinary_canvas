"use client";
import React from "react";
import RecipeCard from "@/components/RecipeCard";
import { useDataContext } from "@/app/store/data-context";
import { UseUserContext } from "@/app/store/userContext";

const Recipies = () => {
  const { chefs, recipes } = useDataContext();
  const { user } = UseUserContext();

  return (
    <section className="flex flex-col gap-10 w-3/4 md:w-full text-white font-bold">
      <p>
        You have <span className="text-black">{}</span> to explore
      </p>

      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5">
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.name} />
        ))}
      </div>
    </section>
  );
};

export default Recipies;
