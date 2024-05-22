import React from "react";
import Image from "next/image";
import { AlarmClock, Flame, Heart, MessageCircleMore } from "lucide-react";
import { recipeType } from "@/app/schema/recipe";
import Link from "next/link";
import { useDataContext } from "@/app/store/data-context";

const PopularRecipeCard = ({ recipe }: { recipe: recipeType }) => {
  const { comments, likes } = useDataContext();

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
  return (
    <div
      key={recipe.id}
      className="flex flex-col gap-2 p-2 rounded-xl hover:bg-purple-400 hover"
    >
      <Link href={`/recipies/${recipe.id}`}>
        <div className="flex gap-5">
          {" "}
          <Image
            src={
              recipe?.recipe_image_url && recipe?.recipe_image_url !== "NAN"
                ? `${recipe.recipe_image_url}`
                : "/noavatar.png"
            }
            alt=""
            width={60}
            height={40}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col gap-2">
            <div className="text-pink-500 font-bold">{recipe?.name}</div>{" "}
            <div className="flex gap-3">
              <div className="flex gap-1">
                <Flame className="text-red-500" /> {recipe?.calories} calories
              </div>
              <div className="flex gap-1">
                <AlarmClock className="text-indigo-500" /> {recipe?.cookingTime}{" "}
                mins
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <div className="flex gap-4">
                <div className="text-gray-500 flex gap-2">
                  <Heart /> {returnNumberOfLikes(recipe?.id)}
                </div>
                <div className="text-gray-500 flex gap-2">
                  <MessageCircleMore /> {returnNumberOfComments(recipe?.id)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularRecipeCard;
