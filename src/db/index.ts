import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { userRelations, users } from "./schema/user";
import { recipeRelations, recipes } from "./schema/recipe";
import { likeRelations, likes } from "./schema/like";
import { comments } from "../../comments";
import { followRelations, follows } from "./schema/follow";
import { commentRelations } from "./schema/comment";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: {
    users,
    recipes,
    likes,
    comments,
    follows,
    userRelations,
    recipeRelations,
    likeRelations,
    commentRelations,
    followRelations,
  },
});
