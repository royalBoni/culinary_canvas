"use client";
import React, { useState, ChangeEvent } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormTextField } from "../form-fields";
import { recipeType } from "@/app/schema/recipe";
import { Button } from "../Button";
import { Select } from "../form-fields/Select";
import { ImagePlus, X } from "lucide-react";
import { FormTextArea } from "../form-fields/TextArea";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { UseUserContext } from "@/app/store/userContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type CategoriesAndCountriesType = string[];

const allCategories: CategoriesAndCountriesType = [
  "Dessert",
  "Italian",
  "Seafood",
  "Soup",
  "Mexican",
];
const allCountriesOfOrigin: CategoriesAndCountriesType = [
  "Italy",
  "Spain",
  "Mexico",
  "Greece",
  "Ghana",
  "Czechia",
  "Hungary",
];

const CreateRecipeForm: React.FC = () => {
  const { user } = UseUserContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();
  const methods = useForm<recipeType>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [addImageSection, setAddImageSection] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    const fileInput = document.getElementById("images");
    if (fileInput) {
      fileInput.click(); // Programmatically trigger file input click
    }
  };

  const deleteSelectedImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmitNewGift: SubmitHandler<recipeType> = (data: recipeType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("calories", data.calories.toString());
    formData.append("cookingTime", data.cookingTime.toString());
    formData.append("category", data.category);
    formData.append("country", data.countryOfOrigin);
    formData.append("description", data.description);
    formData.append("ingredients", data.activeIngredients);
    formData.append("benefit", data.benefit);
    formData.append("preparation", data.preparation);
    formData.append("userId", user?.id || "");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    mutate(formData);
  };

  const { mutate, reset, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      fetch("https://culinary-canvas-delta.vercel.app/api/recipe", {
        // Using relative path to access API route
        method: "POST",
        body: formData,
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create recipe. Please check your inputs");
        }
        console.log("successfully created");
        reset();
        return res.json();
      }),
    onSuccess: (data) => {
      // Handle successful login (e.g., save user data to context, redirect, etc.)
      console.log("Successfully logged in:", data);
      openOrCloseAlertDialog(false);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return (
    <FormProvider {...methods}>
      <div className=" overflow-y-scroll h-screen w-full lg:w-1/2 lg:h-5/6 font-serif radial p-14 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b-2 py-5 border-white">
          <h1 className="text-5xl font-bold text-white">Create a Recipe</h1>
          <Button>
            <X onClick={() => openOrCloseAlertDialog(false)} />
          </Button>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={methods.handleSubmit(onSubmitNewGift)}
        >
          <FormTextField name="name" label="Name" type="text" />
          <FormTextField
            name="calories"
            label="Number Calories"
            type="number"
          />
          <FormTextField
            name="cookingTime"
            label="Cooking Time"
            type="number"
          />
          <Select name="category" label="Category" options={allCategories} />
          <Select
            name="countryOfOrigin"
            label="Country of Origin"
            options={allCountriesOfOrigin}
          />
          <FormTextArea name="description" label="Description" />
          <FormTextArea name="activeIngredients" label="Active Ingredients" />
          <FormTextArea name="benefit" label="Benefit" />
          <FormTextArea name="preparation" label="Preparation" />

          {/* Input field for uploading images */}
          {addImageSection && (
            <>
              <div>
                <label htmlFor="images">Image:</label>
                {!imagePreview && (
                  <>
                    <div
                      className="bg-gray-500 w-full h-36 flex flex-col justify-center items-center cursor-pointer"
                      onClick={handleIconClick} // Call handleIconClick function when icon is clicked
                    >
                      Click to Add Image
                      <ImagePlus size={50} /> {/* Folder icon */}
                    </div>
                    <input
                      className="w-fit h-fit"
                      hidden
                      id="images"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange} // Handle image selection
                    />
                  </>
                )}
              </div>
              {/* Display image preview */}
              {imagePreview && (
                <div className="relative w-72">
                  <Button className="absolute bg-pink-500 p-1 rounded-full text-white right-1 top-1 hover:bg-gray-500">
                    <X onClick={deleteSelectedImage} />
                  </Button>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="w-72"
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </>
          )}

          <div className="border-2 border-gray-500 rounded-xl p-5 flex justify-between items-center">
            <span className="font-bold text-lg">Add to your recipe</span>
            <div className="bg-gray-500 p-4 rounded-full hover:bg-gray-300">
              <ImagePlus onClick={() => setAddImageSection(true)} />
            </div>
          </div>
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <ReloadIcon className="animate-spin" />
            ) : (
              "Create Recipe"
            )}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateRecipeForm;
