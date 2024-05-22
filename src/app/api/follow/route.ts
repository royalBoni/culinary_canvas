"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Follow } from "@/lib/model";
import { followType } from "@/app/schema/recipe";

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
