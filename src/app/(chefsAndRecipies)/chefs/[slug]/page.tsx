import React from "react";
import { getChef } from "@/lib/actions";
import { getChefPostedCategories } from "@/lib/actions";
import ChefChildPage from "@/components/ChefChildPage";

type SlugType = {
  slug: number;
};

/* const getRecipeById = async (id: number) => {
  const recipeObject = await getRecipe(id);
  return recipeObject;
};
 */

const ChefProfilePage = async ({ params }: { params: SlugType }) => {
  const { slug } = params;

  const chef = await getChef(slug);
  const chefCategories = await getChefPostedCategories(slug);

  return <ChefChildPage chef={chef} recipiesAndCategory={chefCategories} />;
};

export default ChefProfilePage;
