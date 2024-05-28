"use client";
import React from "react";
import Image from "next/image";
import { chefType } from "@/app/schema/recipe";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useMutation } from "@tanstack/react-query";
import { UseUserContext } from "@/app/store/userContext";
import { useDataContext } from "@/app/store/data-context";
import { UseOperationContext } from "@/app/store/operationsContext";
import AlertDialogComponent from "./alertDialog";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";

const ChefListCard = ({ chef }: { chef: chefType }) => {
  const router = useRouter();
  const { user } = UseUserContext();
  const { follows } = useDataContext();
  const { specifyOperation } = UseOperationContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();

  const visitChefPage = (id: number | string) => {
    router.push(`/chefs/${id}`);
  };

  const { mutate, reset } = useMutation({
    mutationFn: (data: any) =>
      fetch(
        data.action ? `/api/follow/${data.action.follow_id}` : "/api/follow",
        {
          // Using relative path to access API route
          method: data.action ? "DELETE" : "POST",
          body: JSON.stringify({
            fan_id: data.fan_id,
            chef_id: data.chef_id,
          }),
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to follow chef");
        }
        if (data.action) {
          console.log("successfully unfollowed");
        } else {
          console.log("successfully followed");
        }

        reset();
        return res.json();
      }),
    onSuccess: (data) => {
      console.log("operation completed:", data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const returnChefFollowers = (user_id: number | string) => {
    const chefFollowers = follows?.filter(
      (follow) => follow?.chef_id === user_id
    );
    return chefFollowers;
  };

  const returnChefFollowing = (user_id: number | string) => {
    const chefFollowing = follows?.filter(
      (follow) => follow?.fan_id === user_id
    );
    return chefFollowing;
  };

  const returnLoggedInUserFollowingChef = (
    user_id: number | string,
    chef_id: number | string
  ) => {
    const chefFollowing = follows?.find(
      (follow) => follow?.fan_id === user_id && follow?.chef_id === chef_id
    );
    if (chefFollowing) {
      return chefFollowing;
    } else {
      return false;
    }
  };

  const selectFollowOperation = (chef_id: string | number) => {
    if (user) {
      mutate({
        fan_id: user.id,
        chef_id: chef_id,
        action: returnLoggedInUserFollowingChef(user?.id, chef_id),
      });
    } else {
      openOrCloseAlertDialog(true);
      specifyOperation("create-account");
    }
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
            src={
              (chef?.img && chef?.img !== null) || chef?.img !== undefined
                ? `${chef?.img}`
                : "/noavatar.png"
            }
            alt="noavatar"
            fill
            className="rounded-full"
          />
        </div>
      </div>
      <div className="bg-black flex flex-col gap-2 items-center">
        <h1
          className="text-pink-500 text-2xl font-bold text-center hover:text-gray-500"
          onClick={() => visitChefPage(chef?.id)}
        >
          {chef?.username}
        </h1>
        <p className="text-gray-500 text-center text-lg font-bold px-7">
          {chef?.bio}
        </p>
        <div className="flex gap-5">
          {" "}
          <div className="text-gray-500">
            {returnChefFollowers(chef?.id)?.length} Followers
          </div>{" "}
          <div className="text-gray-500">
            {returnChefFollowing(chef?.id)?.length} Following
          </div>
        </div>

        <Button onClick={() => selectFollowOperation(chef.id)}>
          {user
            ? returnLoggedInUserFollowingChef(user?.id, chef?.id)
              ? "Following"
              : "Follow"
            : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default ChefListCard;
