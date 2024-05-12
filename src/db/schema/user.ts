import { relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { recipes } from "./recipe";
import { comments } from "./comment";
import { likes } from "./like";
import { follows } from "./follow";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  profile_image_url: text("profile_image_url"),
  background_image_url: text("background_image_url"),
  bio: text("bio"),
  country: text("country"),
  auth_provider: text("auth_provider").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  comments: many(comments),
  likes: many(likes),
  followsAsFollower: many(follows, { relationName: "follower" }),
  followsAsFollowing: many(follows, { relationName: "following" }),
}));
