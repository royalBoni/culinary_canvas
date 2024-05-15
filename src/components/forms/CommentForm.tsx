"use client";

import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormTextField } from "../form-fields";
import { commentType, recipeType } from "@/app/schema/recipe";
import { UseUserContext } from "@/app/store/userContext";
import { Button } from "../Button";
import { Select } from "../form-fields/Select";
import { ImagePlus, X } from "lucide-react";
import { FormTextArea } from "../form-fields/TextArea";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import Image from "next/image";

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

  const methods = useForm();

  const onSubmitNewGift = (data: commentType) => {
    console.log(`${user?.username} is making this comment`);
    console.log(data);
    // Now you can send both the form data and the image files to the server
  };

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
          <FormTextArea name="comment" label="Comment" />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CommentForm;
