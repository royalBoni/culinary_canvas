import { db } from "@/db";
import { eq } from "drizzle-orm";
import { recipes } from "@/db/schema/recipe";
import { revalidatePath } from "next/cache";
import { users } from "@/db/schema/user";
import { likes } from "@/db/schema/like";
import { comments } from "@/db/schema/comment";
import { getCommentsByRecipe } from "./comment";
import { getLikesByRecipe } from "./like";

export const dynamic = "force-dynamic";
export const readRecipes = async () => {
  try {
    revalidatePath("/api/recipes");
    const data = await db.select().from(recipes);
    console.log("Data fetched:", data);
    return data || [];
  } catch (error) {
    return [];
  }
};

export const getRecipe = async (
  recipeId: number,
  includeChef: boolean = false,
  includeComments: boolean = false,
  includeLikes: boolean = false
) => {
  try {
    const recipeQuery = await db
      .select()
      .from(recipes)
      .where(eq(recipes.id, recipeId))
      .execute();
    if (recipeQuery.length === 0) return null;

    const recipeData: any = { ...recipeQuery[0] };

    if (includeChef) {
      const chefQuery = await db
        .select()
        .from(users)
        .where(eq(users.id, recipeData.chefId))
        .execute();
      recipeData.chef = chefQuery.length > 0 ? chefQuery[0] : null;
    }

    if (includeComments) {
      recipeData.comments = await getCommentsByRecipe(recipeId);
    }

    if (includeLikes) {
      recipeData.likes = await getLikesByRecipe(recipeId);
    }

    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};

export const createRecipe = async (recipe: any) => {
  try {
    const newRecipe = await db.insert(recipes).values(recipe).returning();
    revalidatePath("/api/recipes");
    return newRecipe;
  } catch (error) {
    console.error("Error creating new recipe:", error);
    return null;
  }
};

export const updateRecipe = async (id: number, recipeData: any) => {
  try {
    const result = await db
      .update(recipes)
      .set(recipeData)
      .where(eq(recipes.id, id))
      .returning()
      .execute();

    if (result.length === 0) {
      return null;
    }

    revalidatePath(`/api/recipes/${id}`);
    return result[0];
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export const deleteRecipe = async (id: number) => {
  try {
    await db.delete(comments).where(eq(comments.recipe_id, id)).execute();
    await db.delete(likes).where(eq(likes.recipe_id, id)).execute();

    const result = await db
      .delete(recipes)
      .where(eq(recipes.id, id))
      .returning()
      .execute();
    console.log(result);
    if (result.length === 0) {
      return null;
    }

    revalidatePath("/api/recipes");
    return result[0];
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};
