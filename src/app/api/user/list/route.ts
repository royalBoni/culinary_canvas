import { readUsers } from "@/server/user";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const allUsers = await readUsers();
    let response = new Response(JSON.stringify(allUsers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
