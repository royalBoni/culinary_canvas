"use client";
import React from "react";
import Popular_chef_card from "@/components/popular_chefs_card";
import { useDataContext } from "@/app/store/data-context";

const ChefsPage = () => {
  const { chefs, recipies } = useDataContext();

  return (
    <section className="flex flex-col gap-10 w-3/4 text-white font-bold">
      <p>
        You have <span className="text-black">{recipies.length}</span> to
        explore
      </p>

      <div className="grid-cols-3 grid gap-5">
        {chefs.map((chef) => (
          <Popular_chef_card chef={chef} key={chef.id} />
        ))}
      </div>
    </section>
  );
};

export default ChefsPage;
