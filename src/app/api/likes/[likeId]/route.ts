import { getLike } from "@/server/like";

export const GET = async (
  req: Request,
  { params }: { params: { likeId: number } }
) => {
  try {
    const likeId = params.likeId;
    const likes = await getLike(likeId);

    if (!likes) {
      return Response.json({ error: "Like not found" }, { status: 404 });
    }
    return Response.json(likes);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
