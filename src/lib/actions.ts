import { recipes } from "../../recipies-data";
import { chefs } from "../../chefs-data";
import { comments } from "../../comments";
import { chefType, recipeType, commentType } from "@/app/schema/recipe";

export const getRecipies = async () => {
  return recipes as recipeType[];
};

export const getRecipe = async (id: number) => {
  const findRecipe = await recipes.find((recipe) => recipe.id === Number(id));

  return findRecipe as recipeType;
};

export const getAllChefs = async () => {
  return chefs as chefType[];
};

export const getChef = async (id: number) => {
  const findChef = await chefs.find((chef) => chef.id === Number(id));

  return findChef as chefType;
};

export const getProductComments = async (id: number) => {
  const findComments = await comments.filter(
    (comment) => comment.recipe_id === Number(id)
  );

  return findComments as commentType[];
};
