import { db } from "@/db";
import { recipes } from "@/db/schema/recipe";

export const dynamic = "force-dynamic";
export const readRecipes = async () => {
  try {
    const data = await db.select().from(recipes);
    console.log("Data fetched:", data);
    return data || [];
  } catch (error) {
    return [];
  }
};
