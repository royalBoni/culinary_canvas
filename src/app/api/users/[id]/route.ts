import { createFollow, removeFollow } from "@/server/follow";
import { getUser } from "@/server/user";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const id = params.id;

    const query = req.nextUrl.searchParams;

    const includeFollowers = query.get("includeFollowers") === "true";
    const includeFollowing = query.get("includeFollowing") === "true";

    const user = await getUser(id, includeFollowers, includeFollowing);

    if (!user) {
      return Response.json({ error: "User does not exist." }, { status: 404 });
    }
    return Response.json(user);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const followeeId = params.id;
    const body = await req.json();

    const followerId = body.followerId;
    const action = body.action;

    if (action && followerId) {
      if (action === "follow") {
        const newFollow = await createFollow(followeeId, followerId);
        if (!newFollow)
          return Response.json(
            { error: "Follow already exists." },
            { status: 409 }
          );
        revalidatePath(`/api/users/${followeeId}`);
        return Response.json(newFollow);
      } else if (action === "unfollow") {
        const result = await removeFollow(followeeId, followerId);
        if (!result)
          return Response.json(
            { error: "Follow does not exist." },
            { status: 404 }
          );
        revalidatePath(`/api/users/${followeeId}`);
        return Response.json(result);
      }
    }

    return Response.json({ error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
