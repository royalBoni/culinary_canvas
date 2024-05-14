import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { recipes } from "@/db/schema/recipe";
import { revalidatePath } from "next/cache";
import { users } from "@/db/schema/user";
import { likes } from "@/db/schema/like";
import { comments } from "@/db/schema/comment";

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

export const getRecipe = async (recipeId: number) => {
  try {
    const recipe = await db
      .select()
      .from(recipes)
      .where(eq(recipes.id, recipeId));
    if (recipe.length === 0) return null;

    const chef = await db
      .select()
      .from(users)
      .where(eq(users.id, recipe[0].chefId));

    const comments = await getCommentsByRecipe(recipe[0].id);
    const likes = await getLikesByRecipe(recipe[0].id);

    return { ...recipe[0], chef: chef[0], comments: comments, likes: likes };
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

export const addLike = async (userId: number, recipeId: number) => {
  try {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.user_id, userId), eq(likes.recipe_id, recipeId)));

    if (existingLike.length > 0) {
      return null;
    }

    const likeData = { user_id: userId, recipe_id: recipeId };
    const newLike = await db.insert(likes).values(likeData).returning();
    revalidatePath("/api/recipes");
    return newLike;
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
};

export const removeLike = async (userId: number, recipeId: number) => {
  try {
    const result = await db
      .delete(likes)
      .where(and(eq(likes.user_id, userId), eq(likes.recipe_id, recipeId)))
      .returning();

    if (result.length === 0) {
      return null;
    }

    revalidatePath("/api/recipes");
    return result;
  } catch (error) {
    console.error("Error removing like:", error);
    throw error;
  }
};

export const addComment = async (
  userId: number,
  recipeId: number,
  content: string
) => {
  try {
    const commentData = {
      user_id: userId,
      recipe_id: recipeId,
      content: content,
    };
    const newComment = await db
      .insert(comments)
      .values(commentData)
      .returning();
    revalidatePath(`/api/recipes/${recipeId}`);
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getCommentsByRecipe = async (recipeId: number) => {
  try {
    const allComments = await db
      .select({
        commentId: comments.id,
        content: comments.content,
        createdAt: comments.created_at,
        userId: users.id,
        username: users.username,
      })
      .from(comments)
      .innerJoin(users, eq(users.id, comments.user_id))
      .where(eq(comments.recipe_id, recipeId))
      .execute();

    return allComments.map((comment) => ({
      id: comment.commentId,
      content: comment.content,
      created_at: comment.createdAt,
      user: {
        id: comment.userId,
        username: comment.username,
      },
    }));
  } catch (error) {
    console.error("Error fetching comments with user details:", error);
    return [];
  }
};

export const getLikesByRecipe = async (recipeId: number) => {
  try {
    const allLikes = await db
      .select({
        likeId: likes.id,
        userId: users.id,
        username: users.username,
      })
      .from(likes)
      .innerJoin(users, eq(users.id, likes.user_id))
      .where(eq(likes.recipe_id, recipeId))
      .execute();

    return allLikes.map((like) => ({
      id: like.likeId,
      user: {
        id: like.userId,
        username: like.username,
      },
    }));
  } catch (error) {
    console.error("Error fetching likes with user details:", error);
    return [];
  }
};
