"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Recipe, Chef } from "@/lib/model";
/* import bcrypt from "bcrypt"; */

export const POST = async (req: Request) => {
  try {
    await connectToDb(); // Ensure the database is connected

    const body = await req.json(); // Extract data from the request body
    const { email, password } = body;
    console.log(email);

    // Find the chef by email
    const chef = await Chef.findOne({ email });

    if (!chef) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hashed password
    //const isMatch = await bcrypt.compare(password, chef.password_hash);

    if (!password === chef.password_hash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Set the chef's online attribute to true
    chef.online = true;
    await chef.save();

    // Return the chef's details to the frontend
    return NextResponse.json(chef);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
