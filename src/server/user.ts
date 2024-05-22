import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { NewUser, users } from "@/db/schema/user";
import { revalidatePath } from "next/cache";
import { getFollowers, getFollowing } from "./follow";

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

export const getUser = async (
  userId: number,
  includeFollowers = false,
  includeFollowing = false
) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (user.length === 0) return null;

    const userData: any = { ...user[0] };

    if (includeFollowers) {
      userData.followers = await getFollowers(userId);
    }

    if (includeFollowing) {
      userData.following = await getFollowing(userId);
    }

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const checkUserCredentials = async (
  username: string,
  password: string
) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(
        and(eq(users.username, username), eq(users.password_hash, password))
      )
      .execute();

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};
