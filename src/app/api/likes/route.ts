"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Like } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";

export const GET = async (req: Request) => {
  try {
    connectToDb();
    const chef: recipeType[] = await Like.find();
    return NextResponse.json(chef);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};
