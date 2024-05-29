"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Comment } from "@/lib/model";
import { commentType } from "@/app/schema/recipe";
import { v4 as uuidv4 } from "uuid";

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

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.json(); // Extract data from the request body

    const { content, user_id, recipe_id } = body;
    const newComment = new Comment({
      id: uuidv4(),
      content,
      user_id,
      recipe_id,
    });

    await newComment.save(); // Save the new recipe to the database
    console.log("comment saved to DB");

    return NextResponse.json({
      message: "comment added successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
