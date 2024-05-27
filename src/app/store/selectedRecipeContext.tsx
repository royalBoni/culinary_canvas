"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { recipeType } from "../schema/recipe";

export type RecipeContextType = {
  selrecipe: recipeType | undefined;
  selectRecipe: Dispatch<SetStateAction<recipeType | undefined>>; // Type Dispatch<SetStateAction<chefType | undefined>>
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const UseRecipeContext = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }

  return context;
};

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selrecipe, setRecipe] = useState<recipeType | undefined>();

  const selectRecipe: RecipeContextType["selectRecipe"] = (newrecipe) => {
    setRecipe(newrecipe);
  };

  return (
    <RecipeContext.Provider value={{ selrecipe, selectRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
