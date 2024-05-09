import { recipes } from "../../recipies-data";
import { chefs } from "../../chefs-data";
import { comments } from "../../comments";
import { chefType, recipeType, commentType } from "@/app/schema/recipe";

/* type CategoryArrayType ={
	category?:string,
	count?:number
}|null */

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

export const getChefPostedCategories = async (id: number) => {
  const allCategoriesRecipies = await recipes.filter(
    (recipe) => recipe.chefId === Number(id)
  );
  // Create an object to store categories and their counts for each chef

  const newArray: string[] = ["All Categories"];

  allCategoriesRecipies.forEach((recipe) => {
    if (newArray?.includes(recipe.category)) {
      return;
    } else {
      newArray.push(recipe.category);
    }
  });

  return { recipes: allCategoriesRecipies, categories: newArray };
};
