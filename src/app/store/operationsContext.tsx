"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type OperationsContextType = {
  operation: string | undefined;
  specifyOperation: Dispatch<SetStateAction<string | undefined>>; // Type Dispatch<SetStateAction<chefType | undefined>>
};

const OperationContext = createContext<OperationsContextType | undefined>(
  undefined
);

export const UseOperationContext = () => {
  const context = useContext(OperationContext);

  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }

  return context;
};

export const OperationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [operation, setOperation] = useState<string | undefined>();

  const specifyOperation: OperationsContextType["specifyOperation"] = (ops) => {
    setOperation(ops);
  };

  return (
    <OperationContext.Provider value={{ operation, specifyOperation }}>
      {children}
    </OperationContext.Provider>
  );
};
