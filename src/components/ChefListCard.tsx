"use client";
import React from "react";
import Image from "next/image";
import { chefType } from "@/app/schema/recipe";
import { useRouter } from "next/navigation";
import {
  returnChefFollowers,
  returnChefFollowing,
  returnLoggedInUserFollowingChef,
} from "@/lib/actions";
import { Button } from "./Button";
import { UseUserContext } from "@/app/store/userContext";

const ChefListCard = ({ chef }: { chef: chefType }) => {
  const router = useRouter();
  const { user } = UseUserContext();

  const visitChefPage = (id: number) => {
    router.push(`/chefs/${id}`);
  };
  return (
    <div
      key={chef.id}
      className="flex flex-col gap-2 bg-black rounded-xl hover:cursor-pointer pb-3"
    >
      <div className="bg-black h-80 relative">
        <div className="h-1/2 bg-pink-500">
          <div className=" bg-cover bg-center  w-full relative h-full"></div>
        </div>
        <div className="h-1/2 bg-black"></div>
        <div className="h-4/5 absolute m-auto left-0 right-0 top-0 bottom-0 w-3/5">
          <Image
            src={"/noavatar.png"}
            alt="noavatar"
            fill
            className="rounded-full"
          />
        </div>
      </div>
      <div className="bg-black flex flex-col gap-2 items-center">
        <h1
          className="text-pink-500 text-2xl font-bold text-center hover:text-gray-500"
          onClick={() => visitChefPage(chef.id)}
        >
          {chef.username}
        </h1>
        <p className="text-gray-500 text-center text-lg font-bold px-7">
          {chef.bio}
        </p>
        <div className="flex gap-5">
          {" "}
          <div className="text-gray-500">
            {returnChefFollowers(chef.id).length} Followers
          </div>{" "}
          <div className="text-gray-500">
            {returnChefFollowing(chef.id).length} Following
          </div>
        </div>

        <Button>
          {user
            ? returnLoggedInUserFollowingChef(user.id, chef.id)
              ? "Following"
              : "Follow"
            : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default ChefListCard;
