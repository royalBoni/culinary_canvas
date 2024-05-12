import { db } from "@/db";
import { users } from "@/db/schema/user";

export const readUsers = async () => {
  try {
    const data = await db.select().from(users);
    return data || [];
  } catch (error) {
    return [];
  }
};
