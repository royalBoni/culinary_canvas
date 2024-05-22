"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Recipe, Chef } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.json(); // Extract data from the request body
    const { name, description, slug, userId } = body;

    const newPost = new Recipe({
      name,
      description,
      slug,
      userId,
    });

    await newPost.save(); // Save the new recipe to the database
    console.log("Saved to DB");

    return NextResponse.json({ message: "Recipe saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request, { params }: { params: SlugType }) => {
  const { slug } = params;

  try {
    connectToDb();
    const post = await Chef.findOne({ slug });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};
