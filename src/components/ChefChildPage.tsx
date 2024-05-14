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
import { returnChefFollowers, returnChefFollowing } from "@/lib/actions";
import { getAllChefs } from "@/lib/actions";
import { returnLoggedInUserFollowingChef } from "@/lib/actions";
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

  const chefs = getAllChefs();

  const pageActionList = ["Posts", "Followers", "Following"];
  const selectCategory = (category: string) => {
    setActiveCatrgory(category);
  };

  const selectAction = (action: string) => {
    setChefsListToDisplay(action);
  };

  const selectOperation = (operation: string) => {
    openOrCloseAlertDialog(true);
    specifyOperation(operation);
  };

  return (
    <div className="h-auto flex flex-col w-4/4 lg:w-3/4">
      <div className="bg-[url('/noavatar.png')] backgroungImage max-w-full relative min-h-80">
        <Image
          src={
            "https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?cs=srgb&dl=pexels-readymade-3850838.jpg&fm=jpg&_gl=1*10ne4qd*_ga*NTEyNTc1MDMxLjE3MTQ2OTUwOTQ.*_ga_8JE65Q40S6*MTcxNDg0NTc5OC4yLjEuMTcxNDg0NTkwNy4wLjAuMA.."
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
              {chef.username}
            </h1>{" "}
            <div className="text-white font-bold">
              {chef.country.slice(0, 3).toUpperCase()}
            </div>
          </div>

          {user?.id === Number(params.slug) ? (
            <Button>
              <UserCog onClick={() => selectOperation("edit-profile")} />
            </Button>
          ) : (
            <Button>
              {user
                ? returnLoggedInUserFollowingChef(user.id, chef.id)
                  ? "Following"
                  : "Follow"
                : "Follow"}
            </Button>
          )}

          <div className="text-pink-500 flex gap-5">
            <div className="flex gap-1 items-center cursor:pointer">
              {returnChefFollowers(chef.id).length}
              <span className="text-gray-500 hover:text-white">Followers</span>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              {returnChefFollowing(chef.id).length}
              <span className="text-gray-500 hover:text-white">Following</span>
            </div>
          </div>

          <p className="text-pink-500">{chef.bio}</p>

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
            {recipiesAndCategory.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : chefsListToDisplay === "Followers" ? (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5  mt-10">
            {returnChefFollowers(chef.id).map((item) =>
              chefs.map((chefItem) => {
                if (chefItem.id === item.fan_id) {
                  return <ChefListCard chef={chefItem} key={chefItem.id} />;
                }
              })
            )}
          </div>
        ) : (
          <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-5 mt-10">
            {returnChefFollowing(chef.id).map((item) =>
              chefs.map((chefItem) => {
                if (chefItem.id === item.chef_id) {
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
