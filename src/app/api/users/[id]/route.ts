import { addFollow, getUser, removeFollow } from "@/server/user";

export const dynamic = "force-dynamic";

export const GET = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const id = params.id;
    const user = await getUser(id);

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
        const newFollow = await addFollow(followerId, followeeId);
        if (!newFollow)
          return Response.json(
            { error: "Follow already exists." },
            { status: 409 }
          );

        return Response.json(newFollow);
      } else if (action === "unfollow") {
        const result = await removeFollow(followerId, followeeId);
        if (!result)
          return Response.json(
            { error: "Follow does not exist." },
            { status: 404 }
          );

        return Response.json(result);
      }
    }

    return Response.json({ error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
