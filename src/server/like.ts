import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { likes } from "@/db/schema/like";
import { revalidatePath } from "next/cache";
import { users } from "@/db/schema/user";

export const getLikes = async () => {
  try {
    const data = await db.select().from(likes);
    return data || [];
  } catch (error) {
    return [];
  }
};

export const getLike = async (likeId: number) => {
  try {
    const likeQuery = await db
      .select()
      .from(likes)
      .where(eq(likes.id, likeId))
      .execute();
    if (likeQuery.length === 0) return null;

    const likeData: any = { ...likeQuery[0] };

    return likeData;
  } catch (error) {
    console.error("Error fetching like:", error);
    return null;
  }
};

export const createLike = async (userId: number, recipeId: number) => {
  try {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.user_id, userId), eq(likes.recipe_id, recipeId)));

    if (existingLike.length > 0) {
      throw new Error("Like relationship already exists.");
    }

    const likeData = {
      user_id: userId,
      recipe_id: recipeId,
    };

    const newLike = await db.insert(likes).values(likeData).returning();
    revalidatePath("/api/likes");
    revalidatePath("/api/recipes");
    return newLike;
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
};

export const deleteLike = async (likeId: number) => {
  try {
    const result = await db
      .delete(likes)
      .where(eq(likes.id, likeId))
      .returning();

    if (result.length === 0) {
      return null;
    }

    revalidatePath("/api/likes");
    revalidatePath("/api/recipes");
    return result;
  } catch (error) {
    console.error("Error removing like:", error);
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
    revalidatePath("/api/likes");
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
