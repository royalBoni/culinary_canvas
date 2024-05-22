import { createFollow, deleteFollow, getFollows } from "@/server/follow";
import { revalidatePath } from "next/cache";

export const GET = async () => {
  try {
    const follows = await getFollows();
    return Response.json(follows);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const userId = body.userId;
    const followerId = body.followerId;
    if (!userId) {
      return Response.json(
        { error: "Missing fields: userId" },
        { status: 400 }
      );
    }
    if (!followerId) {
      return Response.json(
        { error: "Missing fields: followerId" },
        { status: 400 }
      );
    }
    const result = await createFollow(userId, followerId);

    if (!result) {
      return Response.json(
        { error: "Follow operation failed or already exists." },
        { status: 409 }
      );
    }
    revalidatePath("/api/follows");
    revalidatePath("/api/users");
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const followId = body.followId;

    if (!followId) {
      return Response.json(
        { error: "Missing fields: followId" },
        { status: 400 }
      );
    }

    const result = await deleteFollow(followId);
    if (!result) {
      return Response.json({ error: "Follow not found" }, { status: 404 });
    }
    revalidatePath("/api/follows");
    revalidatePath("/api/users");
    return Response.json({ message: "Follow removed successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
