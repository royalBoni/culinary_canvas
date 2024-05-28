"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Recipe } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { cloudinary } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

type UploadResult = {
  secure_url: string;
  public_id: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const imageFile = body.get("image") as File;

    const uploadImage = async (): Promise<UploadResult> => {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const results = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["nextjs-route-handlers-upload-profile-images"],
            },
            function (error: any, result: any) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            }
          )
          .end(buffer);
      });
      return results as UploadResult;
    };

    const newRecipe = new Recipe({
      name: body.get("name"),
      userId: body.get("userId"),
      id: uuidv4(),
      calories: Number(body.get("calories")),
      benefit: body.get("benefit"),
      category: body.get("category"),
      cookingTime: Number(body.get("cookingTime")),
      countryOfOrigin: body.get("countryOfOrigin"),
      description: body.get("description"),
      activeIngredients: body.get("ingredients"),
      chefId: body.get("userId"),
      img: imageFile && (await uploadImage()).secure_url,
      img_id: imageFile && (await uploadImage()).secure_url,
      preparation: body.get("preparation"),
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
