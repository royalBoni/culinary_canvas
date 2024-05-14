import { createComment } from "@/server/comment";
import { revalidatePath } from "next/cache";

export const POST = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const recipeId = params.id;
    const body = await req.json();
    const userId = body.userId;
    const content = body.content;

    if (!userId || !content) {
      return Response.json(
        { error: "Missing user ID or content." },
        { status: 400 }
      );
    }

    const newComment = await createComment(userId, recipeId, content);
    revalidatePath(`/api/recipes/${recipeId}`);
    return Response.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
