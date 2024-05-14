import { getFollow } from "@/server/follow";
import {} from "@/server/user";

export const GET = async (
  req: Request,
  { params }: { params: { followId: number } }
) => {
  try {
    const follow = await getFollow(params.followId);

    if (!follow) {
      return Response.json({ error: "Follow not found" }, { status: 404 });
    }

    return Response.json(follow);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
