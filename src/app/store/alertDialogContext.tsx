"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type AlertDialogContextType = {
  alertDialog: boolean;
  openOrCloseAlertDialog: Dispatch<SetStateAction<boolean>>;
};

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);

export const useAlertDialogContext = () => {
  // Changed from UseAlertDialogContext to useAlertDialogContext (convention)
  const context = useContext(AlertDialogContext);

  if (!context) {
    throw new Error(
      "useAlertDialogContext must be used within an AlertDialogProvider"
    );
  }

  return context;
};

export const AlertDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Changed from UserProvider to AlertDialogProvider
  const [alertDialog, setAlertDialog] = useState<boolean>(false); // Renamed accordionState to accordion

  const openOrCloseAlertDialog: AlertDialogContextType["openOrCloseAlertDialog"] =
    (state) => {
      setAlertDialog(state);
    };

  return (
    <AlertDialogContext.Provider
      value={{ alertDialog, openOrCloseAlertDialog }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};
