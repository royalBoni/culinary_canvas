import { createLike, deleteLike, getLikes } from "@/server/like";
import { revalidatePath } from "next/cache";

export const GET = async () => {
  try {
    const comments = await getLikes();
    return Response.json(comments);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const userId = body.userId;
    const recipeId = body.recipeId;

    if (!userId) {
      return Response.json(
        { error: "Missing fields: userId" },
        { status: 400 }
      );
    }
    if (!userId) {
      return Response.json(
        { error: "Missing fields: recipeId" },
        { status: 400 }
      );
    }
    const result = await createLike(userId, recipeId);

    if (!result)
      return Response.json(
        { error: "Like operation failed." },
        { status: 409 }
      );
    revalidatePath("api/recipes");
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const likeId = body.likeId;

    if (!likeId) {
      return Response.json(
        { error: "Missing fields: likeId" },
        { status: 400 }
      );
    }
    const result = await deleteLike(likeId);
    if (!result)
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    revalidatePath("api/recipes/likes");
    return Response.json(result);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
