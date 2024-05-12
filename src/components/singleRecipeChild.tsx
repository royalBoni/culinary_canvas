"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { recipeImage } from "../../recipeImage";
import { recipeType, commentType, chefType } from "@/app/schema/recipe";
import { Flame, AlarmClock, Heart, MessageCircleMore } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CommentCard from "./commentCard";
import FormComponent from "./forms/authenticationForm";
import Popular_chef_card from "./popular_chefs_card";
import "../app/(chefsAndRecipies)/recipies/[slug]/styles.css";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const SingleRecipeChild = ({
  recipe,
  comments,
  chef,
}: {
  recipe: recipeType;
  comments: commentType[];
  chef: chefType;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(recipeImage[0]);
  const [openCommentForm, setOpenCommetForm] = useState(false);

  const returnClickedImage = useCallback((url: string) => {
    setImageUrl(url);
  }, []);

  {
    /*  const methods = useForm({
    defaultValues: {
      name: "name",
      type: "comedy",
    },

    //resolver: zodResolver(movieFormSchema)
  }); */
  }

  return (
    <div className="h-screen relative ">
      <div>
        <Link href={"/recipies"}>View more from chef</Link>
      </div>
      <div className="w-5/5 flex gap-10 heights">
        <div className="w-3/5 heights flex gap-5">
          <div className="flex flex-col gap-2 heights overflow-y-auto bg-black w-1/3">
            {recipeImage.map((image) => (
              <Image
                key={image}
                src={image}
                alt=""
                width={400}
                height={400}
                className="object-cover p-3 rounded-3xl"
                onClick={() => returnClickedImage(image)}
              />
            ))}
          </div>
          <div className="bg-black w-2/3 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt=""
              width={400}
              height={400}
              className="object-cover w-4/5 h-4/5"
            />
          </div>
        </div>
        <div className="w-2/5 bg-black flex flex-col gap-5 p-5 info heights overflow-y-auto">
          <h1 className="text-pink-500 font-bold text-3xl">{recipe.name}</h1>
          <div>
            <h1 className="text-pink-500 font-bold">INGREDIENTS:</h1>
            <div className="flex gap-3 flex-wrap">
              {recipe.activeIngredient.split(",").map((ingredient) => (
                <div key={ingredient} className="text-white italic">
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 text-white">
            <div className="flex gap-1">
              <Flame className="text-red-500" /> {recipe.calories} calories
            </div>
            <div className="flex gap-1">
              <AlarmClock className="text-indigo-500" /> {recipe.cookingTime}{" "}
              mins
            </div>
          </div>
          {/* SOCIALS */}
          <div className="flex gap-5">
            <div className="text-red-500 flex gap-2">
              <Heart /> 12
            </div>
            <div className="text-indigo-500 flex gap-2">
              <MessageCircleMore onClick={() => setOpenCommetForm(true)} /> 22
            </div>
          </div>
          <AlertDialog.Root
            open={openCommentForm}
            onOpenChange={setOpenCommetForm}
          >
            <AlertDialog.Trigger>Open</AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Content className="AlertDialogContent">
                {/*  <form
                  onSubmit={(event) => {
                    wait().then(() => setOpenCommetForm(false));
                    event.preventDefault();
                  }}
                >
                  
                  <input type="text" placeholder="enter your name" />
                  <button type="submit">Submit</button>
                </form> */}
                <FormComponent />
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
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
                <div className="AccordionContentText">{recipe.description}</div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger className="text-pink-500 font-bold py-2">
                BENIFITS
              </AccordionTrigger>
              <AccordionContent className="bg-pink-500 text-white">
                <div className="AccordionContentText">{recipe.benefit}</div>
              </AccordionContent>
            </Accordion.Item>

            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger className="text-pink-500 font-bold py-2">
                PREPARATION
              </AccordionTrigger>
              <Accordion.Content className="bg-pink-500 text-white">
                <div className="AccordionContentText">{recipe.preparation}</div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <div className="flex flex-col gap-3">
            <div className="text-pink-500 font-bold">Authored by:</div>{" "}
            <Popular_chef_card chef={chef} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-pink-500 font-bold">COMMENTS:</h1>
            <div className="flex flex-col gap-5">
              {comments.map((comment) => (
                <CommentCard comment={comment} key={comment.id} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  <FormProvider {...methods}>
        <FormTextField name="input" label="name" />
      </FormProvider> */}
    </div>
  );
};

export default SingleRecipeChild;
