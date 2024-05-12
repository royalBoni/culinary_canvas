"use client";
import { createContext, useContext, useState } from "react";
import { chefType, recipeType } from "../schema/recipe";
import { getAllChefs, getRecipies } from "@/lib/actions";

export type dataContextType = {
  chefs: chefType[];
  recipies: recipeType[];
  /*  addChefs: (chefs: chefType[]) => void;
  addRecipies: (recipies: recipeType[]) => void; */
  //setUser: (user: User) => void;
};

const DataContext = createContext<dataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }

  return context;
};

// Provider component to wrap your application
export const DataProvider = async ({ children }: { children: any }) => {
  /* const [chefs, setChefs] = useState<chefType[]>([]);
  const [recipies, setRecipies] = useState<recipeType[]>([]); */

  /* const addRecipies = (recipies: recipeType[]) => {
    setRecipies(recipies);
  };

  const addChefs = (chefs: chefType[]) => {
    setChefs(chefs);
  }; */

  const recipies: recipeType[] = await getRecipies();
  const chefs: chefType[] = await getAllChefs();
  /* addChefs(chefs);
  addRecipies(recipies); */

  return (
    <DataContext.Provider value={{ chefs, recipies }}>
      {children}
    </DataContext.Provider>
  );
};
