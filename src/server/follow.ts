import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { follows, NewFollow } from "@/db/schema/follow";
import { revalidatePath } from "next/cache";

export const getFollows = async () => {
  try {
    const data = await db.select().from(follows);
    return data || [];
  } catch (error) {
    return [];
  }
};

export const getFollow = async (followId: number) => {
  try {
    const followQuery = await db
      .select()
      .from(follows)
      .where(eq(follows.id, followId))
      .execute();
    if (followQuery.length === 0) return null;

    const followData: any = { ...followQuery[0] };

    return followData;
  } catch (error) {
    console.error("Error fetching follow:", error);
    return null;
  }
};

export const createFollow = async (userId: number, followerId: number) => {
  try {
    if (userId === followerId) {
      throw new Error("Users cannot follow themselves.");
    }

    const existingFollow = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.followee_id, userId),
          eq(follows.follower_id, followerId)
        )
      );

    if (existingFollow.length > 0) {
      throw new Error("Follow relationship already exists.");
    }

    const followData: NewFollow = {
      follower_id: followerId,
      followee_id: userId,
    };

    const newFollow = await db.insert(follows).values(followData).returning();
    revalidatePath("/api/follows");
    revalidatePath("/api/users");
    return newFollow;
  } catch (error) {
    console.error("Error adding follow:", error);
    return null;
  }
};

export const deleteFollow = async (followId: number) => {
  try {
    const result = await db
      .delete(follows)
      .where(eq(follows.id, followId))
      .returning();
    revalidatePath("/api/follows");
    revalidatePath("/api/users");
    return result;
  } catch (error) {
    console.error("Error removing follow:", error);
    return null;
  }
};

export const removeFollow = async (userId: number, followerId: number) => {
  try {
    const result = await db
      .delete(follows)
      .where(
        and(
          eq(follows.followee_id, userId),
          eq(follows.follower_id, followerId)
        )
      )
      .returning();
    revalidatePath("/api/follows");
    revalidatePath("/api/users");
    return result;
  } catch (error) {
    console.error("Error removing follow:", error);
    return null;
  }
};

export const getFollowers = async (userId: number) => {
  try {
    const followers = await db
      .select({
        userId: users.id,
        userName: users.username,
        followerId: follows.id,
      })
      .from(users)
      .innerJoin(follows, eq(follows.followee_id, userId))
      .where(eq(users.id, follows.follower_id))
      .all();

    return followers || [];
  } catch (error) {
    console.error("Error fetching followers:", error);
    return [];
  }
};

export const getFollowing = async (userId: number) => {
  try {
    const following = await db
      .select({
        userId: users.id,
        userName: users.username,
        followeeId: follows.id,
      })
      .from(users)
      .innerJoin(follows, eq(follows.follower_id, userId))
      .where(eq(users.id, follows.followee_id))
      .all();

    return following || [];
  } catch (error) {
    console.error("Error fetching followed users:", error);
    return [];
  }
};
