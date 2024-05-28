"use server";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Chef } from "@/lib/model";
import { recipeType } from "@/app/schema/recipe";
import { v4 as uuidv4 } from "uuid";
import { cloudinary } from "@/lib/utils";

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

export const PATCH = async (req: Request) => {
  try {
    connectToDb();

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
    await Chef.findOneAndUpdate(
      { id: body.get("user_id") },
      {
        username: body.get("username"),
        country: body.get("country"),
        bio: body.get("bio"),
        img: imageFile && (await uploadImage()).secure_url,
      },
      {
        new: true,
      }
    );
    return NextResponse.json("Post Updated");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update profile");
  }
};
