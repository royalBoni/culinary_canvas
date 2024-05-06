import { getRecipe } from "../actions";
import { getProductComments } from "../actions";
import { getChef } from "../actions";
import { commentType } from "@/app/schema/recipe";
export const useClient = () => {
  // Custom API client methods
  const getRecipee = async (slug: number) => {
    const response = await getRecipe(slug);

    return response;
  };

  const getProductCommentss = async (slug: number) => {
    /* const response = await fetch(`/api/comments/${slug}`); */
    const response: commentType[] = await getProductComments(slug);

    return response;
  };

  // Return the API client methods
  return {
    getRecipee,
    getProductCommentss,
  };
};

export const getCheff = async (chefId: number) => {
  /* const response = await fetch(`/api/chef/${chefId}`); */
  const data = await getChef(chefId);
  return data;
};
