import { relations } from "drizzle-orm";
import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const follows = sqliteTable("follows", {
  id: integer("id").primaryKey().notNull(),
  follower_id: integer("follower_id")
    .references(() => users.id)
    .notNull(),
  following_id: integer("following_id")
    .references(() => users.id)
    .notNull(),
});

export const followRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    relationName: "follower",
    fields: [follows.follower_id],
    references: [users.id],
  }),
  following: one(users, {
    relationName: "following",
    fields: [follows.following_id],
    references: [users.id],
  }),
}));
