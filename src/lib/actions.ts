import { recipes } from "../../recipies-data";
import { chefs } from "../../chefs-data";
import { likes } from "../../likes";
import { comments } from "../../comments";
import { follows } from "../../follows";
import { chefType, recipeType, commentType } from "@/app/schema/recipe";
import { CheftLoginOrSignUpType } from "@/components/forms/AuthenticationForm";

/* type CategoryArrayType ={
	category?:string,
	count?:number
}|null */

export const getRecipies = async () => {
  /*  return recipes as recipeType[]; */
};

export const getRecipe = async (id: number) => {
  const findRecipe = await recipes.find((recipe) => recipe.id === Number(id));

  /* return findRecipe as recipeType; */
};

export const getAllChefs = () => {
  return chefs as chefType[];
};

export const getChef = (id: number) => {
  const findChef = chefs.find((chef) => chef.id === Number(id));

  return findChef as chefType;
};

export const getProductComments = async (id: number) => {
  const findComments = await comments.filter(
    (comment) => comment.recipe_id === Number(id)
  );

  /*   return findComments as commentType[]; */
};

export const getChefPostedCategories = (id: number) => {
  const allCategoriesRecipies = recipes.filter(
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

export const loginUser = (data: CheftLoginOrSignUpType) => {
  const findUserToLogin = chefs.find(
    (chef) => chef.password_hash === data.password && chef.email === data.email
  );
  return findUserToLogin;
  /* if (findUserToLogin) {
    return findUserToLogin;
  } else {
    return "nothing was found";
  } */
};

export const returnNumberOfComments = (recipe_id: number) => {
  const findCommentedRecipe = comments.filter(
    (comment) => comment.recipe_id === Number(recipe_id)
  );
  return findCommentedRecipe.length;
};

export const returnNumberOfLikes = (like_id: number | string) => {
  const findLikedRecipe = likes.filter(
    (like) => like.recipe_id === Number(like_id)
  );
  return findLikedRecipe.length;
};

export const checkRecipeLikeForUser = (
  user_id: number | string,
  recipe_id: number | string
) => {
  const findLikedRecipe = likes.find(
    (like) =>
      like.liker_id === Number(user_id) && recipe_id === Number(like.recipe_id)
  );
  if (findLikedRecipe) {
    return true;
  } else {
    return false;
  }
};

export const returnChefFollowers = (user_id: number | string) => {
  const chefFollowers = follows.filter(
    (follow) => follow.chef_id === Number(user_id)
  );
  return chefFollowers;
};

export const returnChefFollowing = (user_id: number | string) => {
  const chefFollowing = follows.filter(
    (follow) => follow.fan_id === Number(user_id)
  );
  return chefFollowing;
};

export const returnLoggedInUserFollowingChef = (
  user_id: number | string,
  chef_id: number | string
) => {
  const chefFollowing = follows.find(
    (follow) =>
      follow.fan_id === Number(user_id) && follow.chef_id === Number(chef_id)
  );
  if (chefFollowing) {
    return true;
  } else {
    return false;
  }
};
