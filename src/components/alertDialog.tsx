"use client";
import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import FormComponent from "./forms/AuthenticationForm";
import "../app/(chefsAndRecipies)/recipies/[slug]/styles.css";
import CreateRecipeForm from "./forms/CreateRecipeForm";
import { UseOperationContext } from "@/app/store/operationsContext";

const AlertDialogComponent = () => {
  const { alertDialog, openOrCloseAlertDialog } = useAlertDialogContext();
  const { operation } = UseOperationContext();
  return (
    <div>
      <AlertDialog.Root
        open={alertDialog}
        onOpenChange={() => openOrCloseAlertDialog(!alertDialog)}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content className="AlertDialogContent">
            {operation === "create-recipe" ? (
              <CreateRecipeForm />
            ) : (
              <FormComponent />
            )}
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default AlertDialogComponent;
