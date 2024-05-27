"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Recipe } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { SlugType } from "@/app/(chefsAndRecipies)/recipies/[slug]/page";
import { cloudinary } from "@/lib/utils";

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

// pages/api/recipe.js

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.formData(); // Extract data from the request body
    /*  const uploadResult = await cloudinary.uploader
      .upload(body.get('image'), {
        public_id: "shoes",
      })
      .catch((error: any) => {
        console.log(error);
      });

    console.log(uploadResult); 

    console.log(body.get("image"));
 */
    const newRecipe = new Recipe({
      name: body.get("name"),
      userId: body.get("userId"),
      id: Math.floor(Math.random() * 1000) + 100,
      calories: body.get("calories"),
      benefit: body.get("benefit"),
      category: body.get("category"),
      cookingTime: body.get("cookingTime"),
      countryOfOrigin: body.get("country"),
      description: body.get("description"),
      activeIngredients: body.get("ingredients"),
      chefId: body.get("userId"),
      //img: uploadResult.secure_url,
      preparation: body.get,
    });

    await newRecipe.save(); // Save the new recipe to the database
    console.log("Recipe saved to DB");

    return NextResponse.json({
      message: "Recipe saved successfully",
      recipe: newRecipe,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
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
