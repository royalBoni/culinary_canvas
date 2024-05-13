"use client";
import React from "react";
import Image from "next/image";
import { chefType } from "@/app/schema/recipe";
import { useRouter } from "next/navigation";

const PopularChefCard = ({ chef }: { chef: chefType }) => {
  const router = useRouter();

  const visitChefPage = (id: number) => {
    router.push(`/chefs/${id}`);
  };
  return (
<<<<<<< HEAD:src/components/popular_chefs_card.tsx
    <div
      key={chef.id}
      className="flex flex-col gap-2 bg-black rounded-xl hover:cursor-pointer"
    >
=======
    <div key={chef.id} className="flex flex-col gap-2 bg-black rounded-xl p-2.5">
>>>>>>> 2e1cfca776e0909e9a194407b603b3bb18932a23:src/components/PopularChefCard.tsx
      <div className="flex gap-5">
        {" "}
        <Image
          src={"/noavatar.png"}
          alt=""
          width={60}
          height={40}
          className="rounded-full w-12 h-12"
        />
        <div onClick={() => visitChefPage(chef.id)}>
          <div className="text-pink-500 font-bold">{chef.username}</div>{" "}
          <div className="text-white">{chef.bio.slice(0, 50)}</div>
          <div className="text-gray-500 font-bold">
            Followed by Samrawit and 2k others
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularChefCard;
