"use client";
import React from "react";
import PopularChefCard from "@/components/PopularChefCard";
import { useDataContext } from "@/app/store/data-context";

const ChefsPage = () => {
  const { chefs, recipies } = useDataContext();

  return (
    <section className="flex flex-col gap-10 w-3/4 text-white font-bold">
      <p>
        You have <span className="text-black">{chefs.length}</span> to
        explore
      </p>

      <div className="grid-cols-3 grid gap-5">
        {chefs.map((chef) => (
          <PopularChefCard chef={chef} key={chef.id} />
        ))}
      </div>
    </section>
  );
};

export default ChefsPage;
