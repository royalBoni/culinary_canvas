"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Like } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";

export const GET = async (req: Request, { params }: { params: SlugType }) => {
  const { slug } = params;
  try {
    connectToDb();
    const chef: recipeType[] = await Like.find({ slug });
    return NextResponse.json(chef);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: SlugType }
) => {
  const { slug } = params;

  try {
    connectToDb();
    await Like.deleteOne({ like_id: slug });
    return NextResponse.json("Like Deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete like");
  }
};
