"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { recipeImage } from "../../recipeImage";
import { recipeType, commentType, chefType } from "@/app/schema/recipe";
import { Flame, AlarmClock, Heart, MessageCircleMore } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import CommentCard from "./commentCard";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { UseUserContext } from "@/app/store/userContext";
import { useDataContext } from "@/app/store/data-context";
import { UseOperationContext } from "@/app/store/operationsContext";
import { useMutation } from "@tanstack/react-query";
import { UseRecipeContext } from "@/app/store/selectedRecipeContext";

import PopularChefCard from "./PopularChefCard";

import "../app/(chefsAndRecipies)/recipies/[slug]/styles.css";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const SingleRecipeChild = ({
  recipe,
  chef,
}: {
  recipe: recipeType;
  chef: chefType;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(recipeImage[0]);

  const returnClickedImage = useCallback((url: string) => {
    setImageUrl(url);
  }, []);

  const { openOrCloseAlertDialog } = useAlertDialogContext();
  const { user } = UseUserContext();
  const { specifyOperation } = UseOperationContext();
  const { selectRecipe } = UseRecipeContext();
  const { likes, comments } = useDataContext();

  const selectCommentOperation = (recipe: recipeType) => {
    if (user) {
      openOrCloseAlertDialog(true);
      specifyOperation("comment");
      selectRecipe(recipe);
    } else {
      openOrCloseAlertDialog(true);
      specifyOperation("create-account");
    }
  };

  const checkRecipeLikeForUser = (
    user_id: number | string,
    recipe_id: number | string
  ) => {
    const findLikedRecipe = likes.find(
      (like) => like.liker_id === user_id && recipe_id === like.recipe_id
    );
    if (findLikedRecipe) {
      return findLikedRecipe;
    } else {
      return false;
    }
  };

  const { mutate, reset } = useMutation({
    mutationFn: (data: any) =>
      fetch(data.action ? `/api/likes/${data.action.like_id}` : "/api/likes", {
        // Using relative path to access API route
        method: data.action ? "DELETE" : "POST",
        body: JSON.stringify({
          liker_id: data.liker_id,
          recipe_id: data.recipe_id,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to like recipe");
        }
        if (data.action) {
          console.log("successfully unliked");
        } else {
          console.log("successfully liked");
        }

        reset();
        return res.json();
      }),
    onSuccess: (data) => {
      console.log("operation completed:", data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const selectLikeOperation = (recipe_id: number | string) => {
    if (user) {
      mutate({
        liker_id: user.id,
        recipe_id: recipe_id,
        action: checkRecipeLikeForUser(user?.id, recipe.id),
      });
    } else {
      openOrCloseAlertDialog(true);
      specifyOperation("create-account");
    }
  };

  const returnNumberOfLikes = (recipe_id: number | string) => {
    const findLikedRecipe = likes?.filter(
      (like) => like.recipe_id === recipe_id
    );
    return findLikedRecipe?.length;
  };
  const returnNumberOfComments = (recipe_id: number | string) => {
    const findCommentedRecipe = comments?.filter(
      (comment) => comment.recipe_id === recipe_id
    );

    return findCommentedRecipe?.length;
  };

  return (
    <div className="h-auto relative lg:w-3/4 w-full">
      <div className="w-5/5 grid gap-10 h-auto lg:heights lg:flex">
        <div className="w-5/5 heights flex flex-col-reverse gap-5 lg:w-3/5 lg:flex-row">
          <div className="flex flex-row gap-2 heights overflow-y-auto bg-black w-3/3 lg:w-1/3 lg:flex-col ">
            {recipeImage.map((image) => (
              <Image
                key={image}
                src={image}
                alt=""
                width={400}
                height={400}
                className="object-cover p-3 rounded-3xl w-40 h-40 lg:w-64 lg:h-64"
                onClick={() => returnClickedImage(image)}
              />
            ))}
          </div>
          <div className="bg-black w-3/3 flex items-center justify-center lg:w-2/3">
            <Image
              src={
                recipe?.img && recipe?.img !== null
                  ? `${recipe?.img}`
                  : "/noavatar.png"
              }
              alt=""
              width={400}
              height={400}
              className="object-cover w-5/5 h-5/5 lg:h-4/5  lg:w-4/5"
            />
          </div>
        </div>
        <div className="w-5/5 bg-black flex flex-col gap-5 p-5 info lg:h-auto lg:w-2/5 heights overflow-y-auto">
          <h1 className="text-pink-500 font-bold text-3xl">{recipe?.name}</h1>
          <div>
            <h1 className="text-pink-500 font-bold">INGREDIENTS:</h1>
            <div className="flex gap-3 flex-wrap">
              {recipe?.activeIngredients?.split(",").map((ingredient) => (
                <div key={ingredient} className="text-white italic">
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 text-white">
            <div className="flex gap-1">
              <Flame className="text-red-500" /> {recipe?.calories} calories
            </div>
            <div className="flex gap-1">
              <AlarmClock className="text-indigo-500" /> {recipe?.cookingTime}{" "}
              mins
            </div>
          </div>
          {/*  SOCIALS */}
          <div className="flex gap-5">
            <div className="text-red-500 flex gap-2 hover:text-gray-500 hover:cursor-pointer">
              <Heart onClick={() => !user && openOrCloseAlertDialog(true)} />{" "}
              {returnNumberOfLikes(recipe?.id)}
            </div>
            <div className="text-indigo-500 flex gap-2 hover:text-gray-500 hover:cursor-pointer">
              <MessageCircleMore /> {returnNumberOfComments(recipe?.id)}
            </div>
          </div>

          {/* SOCIALS INTERACTION*/}
          <div className="flex justify-between border-t-2 py-2 border-gray-500">
            <div className="text-gray-500 flex gap-2 hover:text-white">
              <Heart
                onClick={() => selectLikeOperation(recipe?.id)}
                className={`${
                  user?.id
                    ? checkRecipeLikeForUser(user?.id, recipe?.id)
                      ? "fill-red-500 border-red-500"
                      : ""
                    : ""
                }`}
              />{" "}
              Like
            </div>
            <div
              className="text-gray-500 flex gap-2 hover:text-white"
              onClick={() => selectCommentOperation(recipe)}
            >
              <MessageCircleMore /> Comment
            </div>
          </div>
          <Accordion.Root
            className="AccordionRoot"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger className="text-pink-500 font-bold py-2">
                DESCRIPTION
              </AccordionTrigger>
              <AccordionContent className="bg-pink-500 text-white">
                <div className="AccordionContentText">
                  {recipe?.description}
                </div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger className="text-pink-500 font-bold py-2">
                BENIFITS
              </AccordionTrigger>
              <AccordionContent className="bg-pink-500 text-white">
                <div className="AccordionContentText">{recipe?.benefit}</div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger className="text-pink-500 font-bold py-2">
                PREPARATION
              </AccordionTrigger>
              <Accordion.Content className="bg-pink-500 text-white">
                <div className="AccordionContentText">
                  {recipe?.preparation}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <div className="flex flex-col gap-3">
            <div className="text-pink-500 font-bold">Authored by:</div>{" "}
            <PopularChefCard chef={chef} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-pink-500 font-bold">COMMENTS:</h1>
            <div className="flex flex-col gap-5">
              {comments?.map((comment) => (
                <CommentCard comment={comment} key={comment?.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipeChild;
