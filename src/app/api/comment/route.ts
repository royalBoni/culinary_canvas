"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Comment } from "@/lib/model";
import { commentType } from "@/app/schema/recipe";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";

export const GET = async (req: Request) => {
  try {
    connectToDb();
    const comment: commentType[] = await Comment.find();
    console.log(comment);
    return NextResponse.json(comment);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};
