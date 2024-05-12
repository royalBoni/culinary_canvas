import { relations } from "drizzle-orm";
import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { recipes } from "./recipe";
import { users } from "./user";

export const likes = sqliteTable("likes", {
  id: integer("id").primaryKey().notNull(),
  recipe_id: integer("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export const likeRelations = relations(likes, ({ one }) => ({
  recipe: one(recipes, {
    fields: [likes.recipe_id],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [likes.user_id],
    references: [users.id],
  }),
}));
