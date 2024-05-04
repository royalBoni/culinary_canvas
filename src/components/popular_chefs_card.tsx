import React from "react";
import Image from "next/image";
import { Heart, MessageCircleMore } from "lucide-react";
import { chefType } from "@/app/schema/recipe";
import { Button } from "./button";

const Popular_chef_card = ({ chef }: { chef: chefType }) => {
  return (
    <div key={chef.id} className="flex flex-col gap-2">
      <div className="flex gap-5">
        {" "}
        <Image
          src={"/noavatar.png"}
          alt=""
          width={60}
          height={40}
          className="rounded-full w-12 h-12"
        />
        <div>
          <div className="text-pink-500 font-bold">{chef.username}</div>{" "}
          <div className="text-white">{chef.bio.slice(1, 50)}</div>
          <div className="text-gray-500 font-bold">
            Followed by Samrawit and 2k others
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular_chef_card;
