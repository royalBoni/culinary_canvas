import { db } from "@/db";
import { users } from "@/db/schema/user";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const allUsers = await db.select().from(users);
    console.log(allUsers);
    return Response.json(allUsers);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
