"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Recipe } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";

export const GET = async (req: Request) => {
  try {
    connectToDb();
    const recipes: recipeType[] = await Recipe.find();
    return NextResponse.json(recipes);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};

/* export const DELETE = async (
  req: Request,
  { params }: { params: slugType }
) => {
  const { slug } = params;

  try {
    connectToDb();
    await Post.deleteOne({ slug });
    return NextResponse.json("Post Deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete posts");
  }
};
 */
