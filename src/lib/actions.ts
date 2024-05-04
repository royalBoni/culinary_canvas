import { recipes } from "../../recipies-data";
import { chefs } from "../../chefs-data";

export const getRecipies = async () => {
  return recipes;
};

export const getAllChefs = async () => {
  return chefs;
};
