"use client";
import React, { Suspense } from "react";
import ChefListCard from "@/components/ChefListCard";
import { useDataContext } from "@/app/store/data-context";
import Loader from "@/components/Loader";
import { UseUserContext } from "@/app/store/userContext";
import { chefs } from "../../../../chefs-data";

const ChefsPage = () => {
  const { chefs, chefLoading } = useDataContext();
  const { user } = UseUserContext();
  const processedChef = () => {
    if (user) {
      const filtered = chefs.filter((chef) => chef.id !== user.id);
      return filtered;
    } else {
      return chefs;
    }
  };

  return (
    <section className="flex flex-col p-2 gap-10 w-full text-white font-bold">
      <p>
        You have <span className="text-black">{chefs?.length}</span> to explore
      </p>
      {chefLoading ? (
        <Loader />
      ) : (
        <div className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid gap-5">
          {processedChef()?.map((chef) => (
            <ChefListCard chef={chef} key={chef?.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ChefsPage;
