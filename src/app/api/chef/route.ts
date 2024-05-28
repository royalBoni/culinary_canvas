"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Chef } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { v4 as uuidv4 } from "uuid";

export const GET = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected
    const chefs: recipeType[] = await Chef.find();
    return NextResponse.json(chefs);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.json(); // Extract data from the request body
    const { username, email, password } = body;

    const newChef = new Chef({
      username,
      email,
      password,
      id: uuidv4(),
      /*  profile_image_avatar: "NAN",
      country: "NAN",
      bio: "NAN",
      profile_image_url: "NAN",
      _id: "NAN", */
    });

    await newChef.save(); // Save the new chef to the database
    console.log("Saved to DB");

    return NextResponse.json({ message: "Chef saved successfully" });
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
