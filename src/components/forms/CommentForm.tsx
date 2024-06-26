"use client";

import React, { useState, useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentType, recipeType } from "@/app/schema/recipe";
import { UseUserContext } from "@/app/store/userContext";
import { Button } from "../Button";
import { ImagePlus, X } from "lucide-react";
import { FormTextArea } from "../form-fields/TextArea";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { UseRecipeContext } from "@/app/store/selectedRecipeContext";
import { ReloadIcon } from "@radix-ui/react-icons";

type CategoriesAndCountriesType = string[];

const allCountriesOfOrigin: CategoriesAndCountriesType = [
  "Italy",
  "Spain",
  "Mexico",
  "Greece",
  "Ghana",
];

const CommentForm = () => {
  const { user } = UseUserContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();

  const methods = useForm<commentType>();

  const { selrecipe } = UseRecipeContext();

  const onSubmitNewGift: SubmitHandler<commentType> = (data) => {
    console.log(`${user?.username} is making this comment`);
    console.log(data);
    mutate(data);
    // Now you can send both the form data and the image files to the server
  };

  const { mutate, reset, isPending } = useMutation({
    mutationFn: (newComment: commentType) =>
      fetch("https://culinary-canvas-delta.vercel.app/api/comment", {
        // Using relative path to access API route
        method: "POST",
        body: JSON.stringify({
          user_id: user?.id,
          content: newComment.content,
          recipe_id: selrecipe?.id,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to comment on recipe. Please check your inputs"
          );
        }
        console.log("comment successfully created");
        reset();
        return res.json();
      }),
    onSuccess: (data) => {
      // Handle successful login (e.g., save user data to context, redirect, etc.)
      console.log("comment added:", data);
      openOrCloseAlertDialog(false);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return (
    <FormProvider {...methods}>
      <div className=" overflow-y-scroll h-6/6 w-2/2 lg:w-1/2 lg:h-5/6 font-serif radial p-14 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b-2 py-5 border-white">
          <h1 className="text-5xl font-bold text-white">Post Comment</h1>
          <Button>
            <X onClick={() => openOrCloseAlertDialog(false)} />
          </Button>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={methods.handleSubmit(onSubmitNewGift)}
        >
          <FormTextArea name="content" label="Comment" />

          <Button disabled={isPending} type="submit">
            {isPending ? <ReloadIcon className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CommentForm;
