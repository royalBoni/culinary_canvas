import { createComment, deleteComment } from "@/server/comment";
import { getComments } from "@/server/comment";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const comments = await getComments();
    return Response.json(comments);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const recipeId = body.recipeId;
    const userId = body.userId;
    const content = body.content;

    if (!content) {
      return Response.json(
        { error: "Comment content cannot be empty." },
        { status: 400 }
      );
    }
    if (!recipeId) {
      return Response.json(
        { error: "Missing fields: recipeId" },
        { status: 400 }
      );
    }
    if (!userId) {
      return Response.json(
        { error: "Missing fields: userId" },
        { status: 400 }
      );
    }

    const result = await createComment(recipeId, userId, content);

    if (!result) {
      return Response.json(
        { error: "Failed to add comment." },
        { status: 409 }
      );
    }
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const commentId = body.commentId;
    if (!commentId) {
      return Response.json(
        { error: "Missing fields: commentId" },
        { status: 400 }
      );
    }
    const result = await deleteComment(commentId);
    if (!result) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json({ message: "Comment removed successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
