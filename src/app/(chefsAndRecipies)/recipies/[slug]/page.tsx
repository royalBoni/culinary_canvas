"use client";
import React from "react";
import { getChef, getRecipe } from "@/lib/actions";
import { recipeType, chefType, commentType } from "@/app/schema/recipe";
import { getProductComments } from "@/lib/actions";
import { useDataContext } from "@/app/store/data-context";
import SingleRecipeChild from "@/components/SingleRecipeChild";
import { useQuery } from "@tanstack/react-query";
import "./styles.css";

export type SlugType = {
  slug: string;
};

const SingleRecipe = ({ params }: { params: SlugType }) => {
  const { slug } = params;
  const { recipes, chefs, comments } = useDataContext();

  const getRecipeById = (id: string) => {
    const findRecipe = recipes?.find((recipe) => recipe.id === id);

    return findRecipe as recipeType;
  };

  const getProductComments = (id: number | string) => {
    const findComments = comments?.filter(
      (comment) => Number(comment.recipe_id) === Number(id)
    );

    return findComments;
  };

  const returnChef = (id: number | string) => {
    const findChef = chefs?.find((chef) => chef.id === id);
    return findChef as chefType;
  };

  const recipe: recipeType = getRecipeById(slug);

  const chef = returnChef(recipe?.chefId);

  return <SingleRecipeChild recipe={recipe} chef={chef} />;
};

export default SingleRecipe;
