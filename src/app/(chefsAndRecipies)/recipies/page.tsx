"use client";
import React, { Suspense } from "react";
import Recipy_card from "@/components/recipy_card";
import { useDataContext } from "@/app/store/data-context";
import { UseUserContext } from "@/app/store/userContext";

const Recipies = () => {
  const { chefs, recipies } = useDataContext();
  const { user } = UseUserContext();

  console.log(user);

  return (
    <section className="flex flex-col gap-10 w-3/4 text-white font-bold">
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
  );
};

export default Recipies;
