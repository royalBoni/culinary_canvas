import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { follows, NewFollow } from "@/db/schema/follow";
import { NewUser, users } from "@/db/schema/user";
import { revalidatePath } from "next/cache";

export const readUsers = async () => {
  try {
    revalidatePath("/api/users"); // Refresh cache
    const data = await db.select().from(users);
    console.log("Data fetched:", data);
    return data || [];
  } catch (error) {
    return [];
  }
};

export const createUser = async (user: NewUser) => {
  try {
    const newUser = await db.insert(users).values(user).returning();
    revalidatePath("/api/users");
    return newUser;
  } catch (error) {
    console.error("Error creating new user:", error);
    return null;
  }
};

export const getUser = async (userId: number) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));
    console.log(user);
    if (user.length === 0) return null;

    const followers = await getFollowersOfUser(userId);
    const following = await getUsersUserFollows(userId);

    return { ...user[0], followers, following };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const getFollowersOfUser = async (userId: number) => {
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

const getUsersUserFollows = async (userId: number) => {
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

export const addFollow = async (followerId: number, followeeId: number) => {
  try {
    if (followerId === followeeId) {
      throw new Error("Users cannot follow themselves.");
    }
    console.log("followerId", followerId);
    console.log("followeeId", followeeId);
    const existingFollow = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.followee_id, followeeId),
          eq(follows.follower_id, followerId)
        )
      );

    if (existingFollow.length > 0) {
      throw new Error("Follow relationship already exists.");
    }

    const followData: NewFollow = {
      follower_id: followerId,
      followee_id: followeeId,
    };

    const newFollow = await db.insert(follows).values(followData).returning();
    revalidatePath("/api/users");
    return newFollow;
  } catch (error) {
    console.error("Error adding follow:", error);
    return null;
  }
};

export const removeFollow = async (followerId: number, followeeId: number) => {
  try {
    const result = await db
      .delete(follows)
      .where(
        and(
          eq(follows.followee_id, followeeId),
          eq(follows.follower_id, followerId)
        )
      )
      .returning();
    revalidatePath("/api/users");
    return result;
  } catch (error) {
    console.error("Error removing follow:", error);
    return null;
  }
};
