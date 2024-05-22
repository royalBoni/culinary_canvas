import { insertRecipeSchema, NewRecipe } from "@/db/schema/recipe";
import { addLike, removeLike } from "@/server/like";
import { deleteRecipe, getRecipe, updateRecipe } from "@/server/recipe";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  try {
    const id = params.id;

    const query = req.nextUrl.searchParams;

    const includeChef = query.get("includeChef") === "true";
    const includeLikes = query.get("includeLikes") === "true";
    const includeComments = query.get("includeComments") === "true";

    const recipe = await getRecipe(
      id,
      includeChef,
      includeLikes,
      includeComments
    );

    if (!recipe) {
      return Response.json(
        { error: "Recipe does not exist." },
        { status: 404 }
      );
    }
    return Response.json(recipe);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  const id = params.id;
  const body = await req.json();

  try {
    const request = insertRecipeSchema.parse(body);
    const recipe: NewRecipe = {
      name: request.name,
      description: request.description,
      benefit: request.benefit,
      preparation: request.preparation,
      activeIngredient: request.activeIngredient,
      category: request.category,
      countryOfOrigin: request.countryOfOrigin,
      calories: request.calories,
      cookingTime: request.cookingTime,
      chefId: request.chefId,
      image_url: request.image_url,
    };

    const newRecipe = await updateRecipe(id, recipe);
    if (!newRecipe)
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    revalidatePath(`/api/recipes/${id}`);
    return Response.json(newRecipe);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  const id = params.id;

  try {
    const recipe = await deleteRecipe(id);
    if (!recipe)
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    revalidatePath("api/recipes");
    return Response.json(recipe);
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
    const recipeId = params.id;
    const body = await req.json();

    const userId = body.userId;
    const action = body.action;

    if (!action || !userId) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    if (action === "like") {
      const newLike = await addLike(userId, recipeId);
      if (!newLike) {
        return Response.json(
          { error: "Like already exists." },
          { status: 409 }
        );
      }
      return Response.json(newLike);
    } else if (action === "unlike") {
      const result = await removeLike(userId, recipeId);
      if (!result) {
        return Response.json(
          { error: "Like does not exist." },
          { status: 404 }
        );
      }
      return Response.json(result);
    }

    return Response.json({ error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
