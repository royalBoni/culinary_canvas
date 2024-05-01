import React from "react";
import { getRecipies } from "@/lib/actions";

const Recipies = async () => {
  const recipies = await getRecipies();
  return (
    <div className="flex flex-col bg-red-400 min-h-screen gap-7">
      {recipies.map((recipe) => (
        <div className="bg-red-200 p-5" key={recipe.name}>
          {JSON.stringify(recipe)}
        </div>
      ))}
    </div>
  );
};

export default Recipies;
