"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormTextField } from "../form-fields";
import { recipeType } from "@/app/schema/recipe";
import { UseUserContext } from "@/app/store/userContext";
import { Button } from "../Button";
import { Select } from "../form-fields/Select";
import { ImagePlus, X } from "lucide-react";
import { FormTextArea } from "../form-fields/TextArea";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
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
];

const CreateRecipeForm = () => {
  const { user } = UseUserContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();
  const methods = useForm();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [addImageSection, setAddImageSection] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const previews: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
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

  const deleteSelectImage = (image: string) => {
    const imagesToRemove = imagePreviews.filter(
      (searchedImage) => searchedImage !== image
    );
    setImagePreviews(imagesToRemove);
  };

  const onSubmitNewGift = (data: recipeType) => {
    console.log("this is the data");
    console.log(data);
    // Now you can send both the form data and the image files to the server
  };

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
            name="cooking-time"
            label="Cooking Time"
            type="number"
          />
          <Select name="category" label="Category" options={allCategories} />
          <Select
            name="country"
            label="Country of Origin"
            options={allCountriesOfOrigin}
          />
          <FormTextArea name="description" label="Description" />
          <FormTextArea name="ingredients" label="Active Ingredients" />
          {/* Input field for uploading images */}
          {addImageSection && (
            <>
              <div>
                <label htmlFor="images">Images:</label>
                {imagePreviews.length === 0 && (
                  <>
                    <div
                      className="bg-gray-500 w-full h-36 flex flex-col justify-center items-center cursor-pointer"
                      onClick={handleIconClick} // Call handleIconClick function when icon is clicked
                    >
                      Click to Add Images
                      <ImagePlus size={50} /> {/* Folder icon */}
                    </div>
                    <input
                      className="w-fit h-fit"
                      hidden
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple // Allows multiple image selection
                      onChange={handleImageChange} // Handle image selection
                      ref={(e) => {
                        if (e) methods.register("images", { value: e });
                      }}
                    />
                  </>
                )}
              </div>
              {/* Display image previews */}
              <div className="flex gap-2 flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <div className="relative w-72">
                    <Button className="absolute bg-pink-500 p-1 rounded-full text-white right-1 top-1 hover:bg-gray-500">
                      <X onClick={() => deleteSelectImage(preview)} />
                    </Button>
                    <Image
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      /* style={{ width: "300px", height: "auto", margin: "5px" }} */
                      className="w-72"
                      width={50}
                      height={50}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="border-2 border-gray-500 rounded-xl p-5 flex justify-between items-center">
            <span className="font-bold text-lg">Add to your recipe</span>
            <div className="bg-gray-500 p-4 rounded-full hover:bg-gray-300">
              {" "}
              <ImagePlus
                className=""
                onClick={() => setAddImageSection(true)}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateRecipeForm;
