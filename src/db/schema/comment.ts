import { relations, sql } from "drizzle-orm";
import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { recipes } from "./recipe";
import { users } from "./user";

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey().notNull(),
  recipe_id: integer("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  created_at: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comments.recipe_id],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
}));
