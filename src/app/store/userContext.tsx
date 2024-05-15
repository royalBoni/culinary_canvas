"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { chefType, recipeType } from "../schema/recipe";
import { getAllChefs, getRecipies } from "@/lib/actions";

export type UserContextType = {
  user: chefType | undefined;
  loggedInUser: Dispatch<SetStateAction<chefType | undefined>>; // Type Dispatch<SetStateAction<chefType | undefined>>
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UseUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }

  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<chefType | undefined>();

  const loggedInUser: UserContextType["loggedInUser"] = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, loggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
