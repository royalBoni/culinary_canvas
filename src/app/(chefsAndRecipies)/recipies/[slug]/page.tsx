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
  slug: number;
};

const SingleRecipe = ({ params }: { params: SlugType }) => {
  const { slug } = params;
  const { recipes, chefs, comments } = useDataContext();

  const getRecipeById = (id: number | number) => {
    const findRecipe = recipes?.find(
      (recipe) => Number(recipe.id) === Number(id)
    );

    return findRecipe as recipeType;
  };

  const getProductComments = (id: number) => {
    const findComments = comments?.filter(
      (comment) => comment.recipe_id === Number(id)
    );

    return findComments;
  };

  const returnChef = (id: number | string) => {
    const findChef = chefs?.find((chef) => Number(chef.id) === id);
    return findChef as chefType;
  };

  const recipe: recipeType = getRecipeById(slug);

  const commentss: commentType[] = getProductComments(slug);

  const chef = returnChef(recipe?.chefId);

  return <SingleRecipeChild recipe={recipe} comments={commentss} chef={chef} />;
};

export default SingleRecipe;
