import React from "react";
import { getChef, getRecipe } from "@/lib/actions";
import { recipeType, chefType, commentType } from "@/app/schema/recipe";
import { getProductComments } from "@/lib/actions";
import SingleRecipeChild from "@/components/SingleRecipeChild";
import "./styles.css";

type SlugType = {
  slug: number;
};

const getRecipeById = async (id: number) => {
  const recipeObject = await getRecipe(id);
  return recipeObject;
};

const returnChef = async (id: number) => {
  const chef = await getChef(id);
  return chef as chefType;
};

const returnComments = async (id: number) => {
  const comments = await getProductComments(id);
  return comments as commentType[];
};

const SingleRecipe = async ({ params }: { params: SlugType }) => {
  const { slug } = params;
  const recipe: recipeType = await getRecipeById(slug);

  const comments: commentType[] = await getProductComments(slug);

  const chef = await returnChef(recipe.chefId);

  return <SingleRecipeChild recipe={recipe} comments={comments} chef={chef} />;
};

export default SingleRecipe;
