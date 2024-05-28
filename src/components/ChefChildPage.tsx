"use client";
import React, { useState } from "react";
import Image from "next/image";
import { chefType, recipeType } from "@/app/schema/recipe";
import { Button } from "./Button";
import RecipeCard from "./RecipeCard";
import { UseUserContext } from "@/app/store/userContext";
import { UserCog } from "lucide-react";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";
import { UseOperationContext } from "@/app/store/operationsContext";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { useDataContext } from "@/app/store/data-context";
import { useMutation } from "@tanstack/react-query";
import ChefListCard from "./ChefListCard";

type RecipiesAndCategoryType = {
  categories: string[];
  recipes: recipeType[];
};

const ChefChildPage = ({
  recipiesAndCategory,
  chef,
  params,
}: {
  recipiesAndCategory: RecipiesAndCategoryType;
  chef: chefType;
  params: SlugType;
}) => {
  const [activeCategory, setActiveCatrgory] = useState("All Categories");
  const [chefsListToDisplay, setChefsListToDisplay] = useState("Posts");
  const { user } = UseUserContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();
  const { specifyOperation } = UseOperationContext();

  const { chefs, follows } = useDataContext();

  const pageActionList = ["Posts", "Followers", "Following"];
  const selectCategory = (category: string) => {
    setActiveCatrgory(category);
  };

  const selectAction = (action: string) => {
    setChefsListToDisplay(action);
  };

  const selectOperation = (operation: string) => {
    console.log(operation);
    openOrCloseAlertDialog(true);
    specifyOperation(operation);
  };

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
    const chefFollowing = follows.find(
      (follow) => follow.fan_id === user_id && follow.chef_id === chef_id
    );
    if (chefFollowing) {
      return chefFollowing;
    } else {
      return false;
    }
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
    <div className="h-auto flex flex-col p-2 w-full">
      <div className="bg-[url('/noavatar.png')] backgroungImage max-w-full relative min-h-80">
        <Image
          src={
            chef?.img && chef?.img !== null ? `${chef?.img}` : "/noavatar.png"
          }
          alt="chefs profile image"
          width={300}
          height={400}
          className="object-cover rounded-full w-52 h-52 absolute bottom-0 left-20"
        />
      </div>

      <div className="bg-black p-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <h1 className="text-pink-500 text-4xl font-bold">
              {chef?.username}
            </h1>{" "}
            <div className="text-white font-bold">
              {chef?.country?.slice(0, 3).toUpperCase()}
            </div>
          </div>

          {Number(user?.id) === Number(params.slug) ? (
            <Button>
              <UserCog onClick={() => selectOperation("edit-profile")} /> Edit
              Profile
            </Button>
          ) : (
            <Button onClick={() => selectFollowOperation(chef.id)}>
              {user
                ? returnLoggedInUserFollowingChef(user?.id, chef?.id)
                  ? "Following"
                  : "Follow"
                : "Follow"}
            </Button>
          )}

          <div className="text-pink-500 flex gap-5">
            <div className="flex gap-1 items-center cursor:pointer">
              {returnChefFollowers(chef?.id)?.length}
              <span className="text-gray-500 hover:text-white">Followers</span>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              {returnChefFollowing(chef?.id)?.length}
              <span className="text-gray-500 hover:text-white">Following</span>
            </div>
          </div>

          <p className="text-pink-500">{chef?.bio}</p>

          <div className="flex gap-5">
            <div className="border-pink-500 border text-gray-500 font-bold p-1">
              Facebook
            </div>
            <div className="border-pink-500 border text-gray-500 font-bold p-1">
              Instagram
            </div>
            <div className="border-pink-500 border text-gray-500 font-bold p-1">
              Youtube
            </div>
          </div>

          <div className="flex gap-5 border-1 border-pink-500 border w-fit rounded-3xl p-1">
            {pageActionList.map((action) => (
              <div
                className={`p-2 cursor-pointer ${
                  action === chefsListToDisplay
                    ? `bg-pink-500 text-white rounded-2xl`
                    : `text-pink-500`
                }`}
                key={action}
                onClick={() => selectAction(action)}
              >
                {action}
              </div>
            ))}
          </div>

          {chefsListToDisplay === "Posts" && (
            <div className="flex gap-5 border-1 border-pink-500 border w-fit rounded-3xl p-1">
              {recipiesAndCategory.categories.map((category) => (
                <div
                  className={`p-2 cursor-pointer ${
                    category === activeCategory
                      ? `bg-pink-500 text-white rounded-2xl`
                      : `text-pink-500`
                  }`}
                  key={category}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <>
        {chefsListToDisplay === "Posts" ? (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5 mt-10">
            {recipiesAndCategory.recipes?.map((recipe) => (
              <RecipeCard key={recipe?.id} recipe={recipe} />
            ))}
          </div>
        ) : chefsListToDisplay === "Followers" ? (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5  mt-10">
            {returnChefFollowers(chef?.id).map((item) =>
              chefs.map((chefItem) => {
                if (Number(chefItem?.id) === Number(item.fan_id)) {
                  return <ChefListCard chef={chefItem} key={chefItem?.id} />;
                }
              })
            )}
          </div>
        ) : (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5 mt-10">
            {returnChefFollowing(chef.id).map((item) =>
              chefs.map((chefItem) => {
                if (Number(chefItem.id) === Number(item.chef_id)) {
                  return <ChefListCard chef={chefItem} key={chefItem.id} />;
                }
              })
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default ChefChildPage;
