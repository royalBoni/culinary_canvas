import { getComment } from "@/server/comment";

export const GET = async (
  req: Request,
  { params }: { params: { commentId: number } }
) => {
  try {
    const commentId = params.commentId;
    const comments = await getComment(commentId);

    if (!comments) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json(comments);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
