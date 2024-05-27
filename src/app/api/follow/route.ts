"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Follow } from "@/lib/model";
import { followType } from "@/app/schema/recipe";
import { v4 as uuidv4 } from "uuid";

export const GET = async (req: Request) => {
  try {
    connectToDb();
    const follow: followType[] = await Follow.find();
    console.log(follow);
    return NextResponse.json(follow);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts");
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.json(); // Extract data from the request body
    const { fan_id, chef_id } = body;

    const newFollow = new Follow({
      follow_id: uuidv4(),
      fan_id,
      chef_id,
    });

    await newFollow.save(); // Save the new follow to the database
    console.log("follow Saved to DB");

    return NextResponse.json({ message: "follow saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
