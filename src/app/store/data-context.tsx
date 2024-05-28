"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  chefType,
  recipeType,
  likeType,
  commentType,
  followType,
} from "../schema/recipe";
import { useQuery } from "@tanstack/react-query";

export type dataContextType = {
  chefs: chefType[];
  recipes: recipeType[];
  likes: likeType[];
  comments: commentType[];
  follows: followType[];
  recipeLoading: boolean;
  chefLoading: boolean;
  addChefs: (chefs: chefType[]) => void;
  addRecipes: (recipes: recipeType[]) => void;
  addLikes: (likes: likeType[]) => void;
  addComments: (comments: commentType[]) => void;
  addFollows: (follows: followType[]) => void;
  addRecipyLoadingState: (recipeLoading: boolean) => void;
  addChefLoadingState: (chefLoading: boolean) => void;
};

const DataContext = createContext<dataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }

  return context;
};

export const DataProvider = ({ children }: { children: any }) => {
  const [chefs, setChefs] = useState<chefType[]>([]);
  const [recipes, setRecipes] = useState<recipeType[]>([]);
  const [likes, setLikes] = useState<likeType[]>([]);
  const [comments, setComments] = useState<commentType[]>([]);
  const [follows, setFollows] = useState<followType[]>([]);
  const [recipeLoading, setRecipeLoading] = useState<boolean>(false);
  const [chefLoading, setChefLoading] = useState<boolean>(false);

  const addRecipes = (newRecipes: recipeType[]) => {
    setRecipes(newRecipes);
  };

  const addRecipyLoadingState = (newState: boolean) => {
    setRecipeLoading(newState);
  };

  const addChefLoadingState = (newState: boolean) => {
    setChefLoading(newState);
  };

  const addChefs = (newChefs: chefType[]) => {
    setChefs(newChefs);
  };

  const addLikes = (newLikes: likeType[]) => {
    setLikes(newLikes);
  };

  const addComments = (newComments: commentType[]) => {
    setComments(newComments);
  };

  const addFollows = (newFollows: followType[]) => {
    setFollows(newFollows);
  };

  return (
    <DataContext.Provider
      value={{
        likes,
        chefs,
        recipes,
        comments,
        follows,
        recipeLoading,
        chefLoading,
        addChefs,
        addRecipes,
        addLikes,
        addComments,
        addFollows,
        addRecipyLoadingState,
        addChefLoadingState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
