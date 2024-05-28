"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormTextField } from "../form-fields";
import { chefType, recipeType } from "@/app/schema/recipe";
import { UseUserContext } from "@/app/store/userContext";
import { Button } from "../Button";
import { Select } from "../form-fields/Select";
import { ImagePlus, X } from "lucide-react";
import { FormTextArea } from "../form-fields/TextArea";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { ReloadIcon } from "@radix-ui/react-icons";
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

  const methods = useForm<chefType>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      country: user?.country,
      bio: user?.bio,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  useEffect(() => {
    setImagePreview(user?.img);
  }, []);

  const deleteSelectedImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleIconClick = () => {
    const fileInput = document.getElementById("images");
    if (fileInput) {
      fileInput.click(); // Programmatically trigger file input click
    }
  };

  const onSubmitNewGift: SubmitHandler<chefType> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("country", data.country);
    if (user?.id) {
      formData.append("user_id", user?.id);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    mutate(formData);
  };

  const { mutate, reset, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      fetch("https://culinary-canvas-delta.vercel.app/api/chef", {
        // Using relative path to access API route
        method: "PATCH",

        body: formData,
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update profile. Please check your inputs");
        }
        console.log("successfully updated");
        reset();
        return res.json();
      }),
    onSuccess: (data) => {
      // Handle successful login (e.g., save user data to context, redirect, etc.)
      console.log("Successfully updated in:", data);
      openOrCloseAlertDialog(false);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

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
          <>
            <div>
              <label htmlFor="images">Profile Image</label>
              <div>
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
            </div>
          </>

          <FormTextField name="username" label="Name" type="text" />
          <FormTextField name="email" label="Email" type="email" />

          <Select
            name="country"
            label="Country of Origin"
            options={allCountriesOfOrigin}
            defaultValue={user?.country}
          />
          <FormTextArea name="bio" label="Bio" />

          <Button disabled={isPending} type="submit">
            {isPending ? (
              <ReloadIcon className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default EditProfileForm;
