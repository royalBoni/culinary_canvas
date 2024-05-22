import { checkUserCredentials } from "@/server/user";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const username = body.username;
    const password = body.password;
    if (!username || !password) {
      return Response.json(
        { error: "Missing fields: Username and password are required" },
        { status: 400 }
      );
    }

    const user = await checkUserCredentials(username, password);

    if (!user) {
      return Response.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return Response.json(
      { message: "Login successful", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
