"use client";
import React from "react";
import RecipeCard from "@/components/RecipeCard";
import { useDataContext } from "@/app/store/data-context";
import Loader from "@/components/Loader";

const Recipies = () => {
  const { recipes, recipeLoading } = useDataContext();

  return (
    <section className="flex flex-col gap-10 p-2 w-full text-white font-bold">
      <p>
        You have <span className="text-black">{recipes?.length}</span> to
        explore
      </p>
      {recipeLoading ? (
        <Loader />
      ) : (
        <div className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid gap-5">
          {recipes?.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.name} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Recipies;
