import { insertUserSchema, NewUser } from "@/db/schema/user";
import { createUser } from "@/server/user";
import { revalidatePath } from "next/cache";

import { readUsers } from "@/server/user";
export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const allUsers = await readUsers();
    return Response.json(allUsers);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const request = insertUserSchema.parse(body);
    const user: NewUser = {
      username: request.username,
      email: request.email,
      password_hash: request.password_hash,
      profile_image_url: request.profile_image_url || null,
      background_image_url: request.background_image_url || null,
      bio: request.bio || null,
      country: request.country || null,
      auth_provider: request.auth_provider,
    };

    const newUser = await createUser(user);
    if (!newUser)
      return Response.json({ error: "User already exists" }, { status: 409 });
    revalidatePath("/api/users");
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
