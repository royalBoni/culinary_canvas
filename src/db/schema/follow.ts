import { relations } from "drizzle-orm";
import { integer, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const follows = sqliteTable("follows", {
  id: integer("id").primaryKey().notNull(),
  follower_id: integer("follower_id")
    .references(() => users.id)
    .notNull(),
  followee_id: integer("followee_id")
    .references(() => users.id)
    .notNull(),
});

export const followRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    relationName: "followInitiator",
    fields: [follows.follower_id],
    references: [users.id],
  }),
  followee: one(users, {
    relationName: "followTarget",
    fields: [follows.followee_id],
    references: [users.id],
  }),
}));

export type NewFollow = typeof follows.$inferInsert;
