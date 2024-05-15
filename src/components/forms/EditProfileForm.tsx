"use client";

import React, { useState, useEffect } from "react";
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

const allCountriesOfOrigin: CategoriesAndCountriesType = [
  "Italy",
  "Spain",
  "Mexico",
  "Greece",
  "Ghana",
];

const EditProfileForm = () => {
  const { user } = UseUserContext();
  const { openOrCloseAlertDialog } = useAlertDialogContext();

  const methods = useForm({
    defaultValues: {
      name: user?.username,
      email: user?.email,
      country: user?.country,
      bio: user?.bio,
    },
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
    const fileInput = document.getElementById("profile_image_urls");
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

  /* {
    id: 5,
    username: "chef_antonio",
    email: "antonio@example.com",
    password_hash: "hashed_password_5",
    profile_image_url: "https://example.com/chef_antonio.jpg",
    bio: "Master of Mediterranean cuisine, bringing the flavors of Greece and Spain to your kitchen.",
    country: "Spain",
  }, */

  return (
    <FormProvider {...methods}>
      <div className=" overflow-y-scroll h-screen w-2/2 lg:w-1/2 lg:h-5/6 font-serif radial p-4 lg:p-14 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b-2 py-5 border-white">
          <h1 className="text-5xl font-bold text-white">Edit Profile</h1>
          <Button>
            <X onClick={() => openOrCloseAlertDialog(false)} />
          </Button>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={methods.handleSubmit(onSubmitNewGift)}
        >
          {/* Input field for uploading images */}

          <>
            <div>
              <label htmlFor="images">Profile Image</label>

              {imagePreviews.length === 0 && (
                <div className="flex justify-center">
                  <div
                    className="bg-gray-500 w-72 h-64 rounded-xl flex flex-col justify-center items-center cursor-pointer"
                    onClick={handleIconClick} // Call handleIconClick function when icon is clicked
                  >
                    Click to Add ProfileImage
                    <ImagePlus size={50} /> {/* Folder icon */}
                  </div>
                  <input
                    className="w-fit h-fit"
                    hidden
                    name="profile_image_urls"
                    id="profile_image_urls"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Handle image selection
                    ref={(e) => {
                      if (e)
                        methods.register("profile_image_urls", { value: e });
                    }}
                  />
                </div>
              )}
            </div>
            {/* Display image previews */}
            <div className="flex gap-2 justify-center">
              {imagePreviews.map((preview, index) => (
                <div className="relative w-72">
                  <Button className="absolute bg-pink-500 p-1 rounded-full text-white right-1 top-1 hover:bg-gray-500">
                    <X onClick={() => deleteSelectImage(preview)} />
                  </Button>
                  <Image
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-72 h-64 rounded-xl"
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </div>
          </>

          <FormTextField name="name" label="Name" type="text" />
          <FormTextField name="email" label="Email" type="email" />

          <FormTextField name="password" label="Password" type="password" />
          <FormTextField
            name="confirm-password"
            label="Confirm Password"
            type="password"
          />

          <Select
            name="country"
            label="Country of Origin"
            options={allCountriesOfOrigin}
            defaultValue={user?.country}
          />
          <FormTextArea name="bio" label="Bio" />

          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default EditProfileForm;
