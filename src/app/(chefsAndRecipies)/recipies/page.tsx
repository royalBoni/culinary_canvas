"use client";
import React from "react";
import { getAllChefs, getRecipies } from "@/lib/actions";
import { recipeType, chefType } from "@/app/schema/recipe";
import Recipy_card from "@/components/recipy_card";
import { useDataContext } from "@/app/store/data-context";

const Recipies = () => {
  /* const { addChefs, addRecipies } = useDataContext(); */

  const { chefs, recipies } = useDataContext();
  /*  const chefs: chefType[] = await getAllChefs();
  addChefs(chefs);
  addRecipies(recipies); */

  return (
    <section className="flex flex-col gap-10 w-3/4 text-white font-bold">
      <p>
        You have <span className="text-black">{recipies.length}</span> to
        explore
      </p>

      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5">
        {recipies.map((recipe) => (
          <Recipy_card recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </section>
  );
};

export default Recipies;
