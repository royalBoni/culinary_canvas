"use client";
import React, { useState } from "react";
import Image from "next/image";
import { chefType, recipeType } from "@/app/schema/recipe";
import { Button } from "./button";
import Recipy_card from "./recipy_card";

type RecipiesAndCategoryType = {
  categories: string[];
  recipes: recipeType[];
};

const ChefChildPage = ({
  recipiesAndCategory,
  chef,
}: {
  recipiesAndCategory: RecipiesAndCategoryType;
  chef: chefType;
}) => {
  const [activeCategory, setActiveCategory] = useState("All Categories");

  const selectCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="h-auto flex flex-col">
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

          <Button>Follow</Button>

          <div className="text-pink-500 flex gap-5">
            <div>
              12K <span className="text-gray-500">Followers</span>
            </div>
            <div>
              12 <span className="text-gray-500">Following</span>
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
        </div>
      </div>
      <div className="grid-cols-3 grid gap-5 mt-10">
        {recipiesAndCategory.recipes.map((recipe, index) => (
          <Recipy_card recipe={recipe} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChefChildPage;
