"use client";
import React from "react";
import { chefType } from "@/app/schema/recipe";
import { getChef } from "@/lib/actions";
import { getChefPostedCategories } from "@/lib/actions";
import ChefChildPage from "@/components/ChefChildPage";
import { useDataContext } from "@/app/store/data-context";

type SlugType = {
  slug: string;
};

const ChefProfilePage = ({ params }: { params: SlugType }) => {
  const { slug } = params;
  const { recipes, chefs } = useDataContext();

  const getChef = (id: string) => {
    const findChef = chefs?.find((chef) => chef.id === id);

    return findChef as chefType;
  };

  const chef = getChef(slug);

  const getChefPostedCategories = (id: string) => {
    const allCategoriesRecipies = recipes?.filter(
      (recipe) => recipe.chefId === id
    );
    // Create an object to store categories and their counts for each chef

    const newArray: string[] = ["All Categories"];

    allCategoriesRecipies?.forEach((recipe) => {
      if (newArray?.includes(recipe.category)) {
        return;
      } else {
        newArray.push(recipe.category);
      }
    });

    return { recipes: allCategoriesRecipies, categories: newArray };
  };
  const chefCategories = getChefPostedCategories(slug);

  return (
    <ChefChildPage
      chef={chef}
      recipiesAndCategory={chefCategories}
      params={params}
    />
  );
};

export default ChefProfilePage;
