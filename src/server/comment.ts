import { eq } from "drizzle-orm";
import { db } from "@/db";
import { comments } from "@/db/schema/comment";
import { revalidatePath } from "next/cache";
import { users } from "@/db/schema/user";

export const getComments = async () => {
  try {
    const data = await db.select().from(comments);
    return data || [];
  } catch (error) {
    return [];
  }
};

export const getComment = async (commentId: number) => {
  try {
    const commentQuery = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .execute();
    if (commentQuery.length === 0) return null;

    const commentData: any = { ...commentQuery[0] };

    return commentData;
  } catch (error) {
    console.error("Error fetching comment:", error);
    return null;
  }
};

export const createComment = async (
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
    revalidatePath(`/api/comments`);
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const updateComment = async (commentId: number, content: string) => {
  try {
    const comment = await db
      .update(comments)
      .set({ content })
      .where(eq(comments.id, commentId))
      .returning();

    return comment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const result = await db
      .delete(comments)
      .where(eq(comments.id, commentId))
      .returning();

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error removing comment:", error);
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
