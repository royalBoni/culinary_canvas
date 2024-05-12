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
