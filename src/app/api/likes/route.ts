"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Like } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { v4 as uuidv4 } from "uuid";

export const GET = async (req: Request) => {
  try {
    connectToDb();
    const likes: recipeType[] = await Like.find();
    return NextResponse.json(likes);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.json(); // Extract data from the request body
    const { liker_id, recipe_id } = body;

    const newLike = new Like({
      like_id: uuidv4(),
      liker_id,
      recipe_id,
    });

    await newLike.save(); // Save the new recipe to the database
    console.log("like Saved to DB");

    return NextResponse.json({ message: "like saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
