import React from "react";
import Image from "next/image";
import { AlarmClock, Flame, Heart, MessageCircleMore } from "lucide-react";
import { recipeType } from "@/app/schema/recipe";
import Link from "next/link";

const Popular_recipe_card = ({ recipe }: { recipe: recipeType }) => {
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
              "https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?cs=srgb&dl=pexels-pixabay-434258.jpg&fm=jpg&_gl=1*ngbhgn*_ga*NTEyNTc1MDMxLjE3MTQ2OTUwOTQ.*_ga_8JE65Q40S6*MTcxNDY5NTA5NC4xLjEuMTcxNDY5NTE5NC4wLjAuMA.."
            }
            alt=""
            width={60}
            height={40}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col gap-2">
            <div className="text-pink-500 font-bold">{recipe.name}</div>{" "}
            <div className="flex gap-3">
              <div className="flex gap-1">
                <Flame className="text-red-500" /> {recipe.calories} calories
              </div>
              <div className="flex gap-1">
                <AlarmClock className="text-indigo-500" /> {recipe.cookingTime}{" "}
                mins
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <div className="flex gap-4">
                <div className="text-gray-500 flex gap-2">
                  <Heart /> 12
                </div>
                <div className="text-gray-500 flex gap-2">
                  <MessageCircleMore /> 22
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Popular_recipe_card;
