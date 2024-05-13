import { relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { comments } from "./comment";
import { likes } from "./like";

export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  benefit: text("benefit"),
  preparation: text("preparation").notNull(),
  activeIngredient: text("active_ingredient").notNull(),
  category: text("category").notNull(),
  countryOfOrigin: text("country_of_origin").notNull(),
  calories: integer("calories").notNull(),
  cookingTime: integer("cooking_time").notNull(),
  chefId: integer("chef_id")
    .references(() => users.id)
    .notNull(),
  image_url: text("image_url"),
});

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  chef: one(users, {
    fields: [recipes.chefId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));
