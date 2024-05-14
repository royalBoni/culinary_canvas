import { readRecipes } from "@/server/recipe";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const allRecipes = await readRecipes();
    return Response.json(allRecipes);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
