"use client";
import React from "react";
import ChefListCard from "@/components/ChefListCard";
import { useDataContext } from "@/app/store/data-context";

const ChefsPage = () => {
  const { chefs, recipies } = useDataContext();

  return (
    <section className="flex flex-col gap-10 w-4/4 text-white font-bold lg:w-3/4">
      <p>
        You have <span className="text-black">{chefs.length}</span> to explore
      </p>

      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5 px-5">
        {chefs.map((chef) => (
          <ChefListCard chef={chef} key={chef.id} />
        ))}
      </div>
    </section>
  );
};

export default ChefsPage;
