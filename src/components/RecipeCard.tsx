import React from "react";
import Image from "next/image";
import { Heart, MessageCircleMore } from "lucide-react";
import { chefType, likeType, recipeType } from "@/app/schema/recipe";
import { Button } from "./Button";
import Link from "next/link";
import { UseUserContext } from "@/app/store/userContext";
import { UseOperationContext } from "@/app/store/operationsContext";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { useDataContext } from "@/app/store/data-context";
import { UseRecipeContext } from "@/app/store/selectedRecipeContext";
import { useMutation } from "@tanstack/react-query";

const RecipeCard = ({ recipe }: { recipe: recipeType }) => {
  const { user } = UseUserContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();
  const { specifyOperation } = UseOperationContext();
  const { chefs, recipes, likes, comments } = useDataContext();
  const { selectRecipe } = UseRecipeContext();

  const returnChef = (id: number | string) => {
    const findChef = chefs?.find((chef) => chef.id === id);
    return findChef as chefType;
  };

  const returnNumberOfLikes = (recipe_id: number | string) => {
    const findLikedRecipe = likes?.filter(
      (like) => like.recipe_id === recipe_id
    );
    return findLikedRecipe?.length;
  };

  const returnNumberOfComments = (recipe_id: number | string) => {
    const findCommentedRecipe = comments?.filter(
      (comment) => comment.recipe_id === recipe_id
    );

    return findCommentedRecipe?.length;
  };

  const checkRecipeLikeForUser = (
    user_id: number | string,
    recipe_id: number | string
  ) => {
    const findLikedRecipe = likes.find(
      (like) => like.liker_id === user_id && recipe_id === like.recipe_id
    );
    if (findLikedRecipe) {
      return findLikedRecipe;
    } else {
      return false;
    }
  };

  const { mutate, reset } = useMutation({
    mutationFn: (data: any) =>
      fetch(data.action ? `/api/likes/${data.action.like_id}` : "/api/likes", {
        // Using relative path to access API route
        method: data.action ? "DELETE" : "POST",
        body: JSON.stringify({
          liker_id: data.liker_id,
          recipe_id: data.recipe_id,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to like recipe");
        }
        if (data.action) {
          console.log("successfully unliked");
        } else {
          console.log("successfully liked");
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

  const selectLikeOperation = (recipe_id: number | string) => {
    if (user) {
      mutate({
        liker_id: user.id,
        recipe_id: recipe_id,
        action: checkRecipeLikeForUser(user?.id, recipe.id),
      });
    } else {
      openOrCloseAlertDialog(true);
      specifyOperation("create-account");
    }
  };

  const selectCommentOperation = (recipe: recipeType) => {
    if (user) {
      openOrCloseAlertDialog(true);
      specifyOperation("comment");
      selectRecipe(recipe);
    } else {
      openOrCloseAlertDialog(true);
      specifyOperation("create-account");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="p-5 rounded-lg text-white bg-black flex flex-col gap-3 border-4 border-transparent hover:border-pink-400">
        <div className="flex justify-center items-center">
          <Image
            src={
              (recipe?.img && recipe?.img !== null) || recipe?.img !== undefined
                ? `${recipe.img}`
                : "/noavatar.png"
            }
            alt=""
            width={300}
            height={100}
            className="w-100 h-48 rounded-xl shadow-md shadow-indigo-500"
          />
        </div>
        <h2 className="font-bold text-pink-500">{recipe.name}</h2>

        {/* DESCRIPTION */}
        <div>{recipe.description.slice(0, 100)}...</div>

        {/* CHEF */}
        <div className="flex justify-between items-center">
          <div className=" flex items-center gap-3">
            <Image
              src={
                returnChef(recipe?.chefId)?.img
                  ? `${returnChef(recipe?.chefId)?.img}`
                  : "/noavatar.png"
              }
              alt=""
              width={10}
              height={30}
              className="rounded-full w-12 h-12"
            />{" "}
            <span className="text-gray-500">
              {returnChef(recipe.chefId)?.username}
            </span>
          </div>
          <div>{recipe?.countryOfOrigin?.slice(0, 3).toUpperCase()}</div>
        </div>

        {/* SOCIALS */}

        <div className="flex justify-around">
          <div className="text-red-500 flex gap-2">
            <Heart className="" /> {returnNumberOfLikes(recipe.id)}
          </div>
          <div className="text-indigo-500 flex gap-2">
            <MessageCircleMore /> {returnNumberOfComments(recipe.id)}
          </div>
        </div>

        {/* SOCIALS INTERACTION*/}
        <div className="flex justify-between border-t-2 py-2 border-gray-500">
          <div className="text-gray-500 flex gap-2 hover:text-white">
            <Heart
              onClick={() => selectLikeOperation(recipe.id)}
              className={`${
                user?.id
                  ? checkRecipeLikeForUser(user?.id, recipe.id)
                    ? "fill-red-500 border-red-500"
                    : ""
                  : ""
              }`}
            />{" "}
            Like
          </div>
          <div
            className="text-gray-500 flex gap-2 hover:text-white"
            onClick={() => selectCommentOperation(recipe)}
          >
            <MessageCircleMore /> Comment
          </div>
        </div>
      </div>

      <Button>
        <Link href={`/recipies/${recipe.id}`}>Explore Me</Link>
      </Button>
    </div>
  );
};

export default RecipeCard;
