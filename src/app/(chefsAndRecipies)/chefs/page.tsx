"use client";
import React, { Suspense } from "react";
import ChefListCard from "@/components/ChefListCard";
import { useDataContext } from "@/app/store/data-context";
import Loader from "@/components/Loader";

const ChefsPage = () => {
  const { chefs, chefLoading } = useDataContext();

  return (
    <section className="flex flex-col p-2 gap-10 w-full text-white font-bold">
      <p>
        You have <span className="text-black">{chefs?.length}</span> to explore
      </p>
      {chefLoading ? (
        <Loader />
      ) : (
        <div className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid gap-5">
          {chefs?.map((chef) => (
            <Suspense key={chef?.id}>
              <ChefListCard chef={chef} key={chef?.id} />
            </Suspense>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChefsPage;
