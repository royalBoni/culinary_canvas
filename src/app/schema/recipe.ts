import z from "zod";
import { zId, zUUID } from "@zodyac/zod-mongoose";
import exp from "constants";

/**
 * Movie
 */
/* export const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  benefit: z.string(),
  preparation: z.string(),
  activeIngredients: z.string(),
  category: z.string(),
  countryOfOrigin: z.string(),
  calories: z.number(),
  cookingTime: z.number(),
  chefId: z.number(),
  createdAt: z.date(),
  recipe_image_url: z.string(),
  recip_image_avatar: z.string(),
  _id: z.string(),
}); */

export type recipeType = {
  id: string;
  name: string;
  description: string;
  benefit: string;
  preparation: string;
  activeIngredients: string;
  category: string;
  countryOfOrigin: string;
  calories: number;
  cookingTime: number;
  chefId: string;
  img: string | null;
  timeStamp: string;
};

//export type recipeType = z.infer<typeof recipeSchema>;

/* export const likeSchema = z.object({
  like_id: z.string(),
  recipe_id: z.string(),
  liker_id: z.string(),
}); */

export type likeType = {
  like_id: string;
  recipe_id: string;
  liker_id: string;
};

//export type likeType = z.infer<typeof likeSchema>;

/* export const followSchema = z.object({
  follow_id: z.string(),
  fan_id: z.string(),
  chef_id: z.string(),
}); */

export type followType = {
  follow_id: string;
  fan_id: string;
  chef_id: string;
};

//export type followType = z.infer<typeof followSchema>;

/* export const chefSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password_hash: z.string(),
  profile_image_url: z.any().nullable(),
  bio: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  online: z.string().optional().or(z.literal("")),
  profile_image_avatar: z.string().optional().or(z.literal("")),
}); */

export type chefType = {
  id: string;
  username: string;
  email: string;
  password: string;
  img: string | null;
  bio: string;
  country: string;
  isLogged: boolean;
  timeStamp: string;
};

//export type chefType = z.infer<typeof chefSchema>;

/* export const commentSchema = z.object({
  id: z.number(),
  recipe_id: z.number(),
  user_id: z.number(),
  content: z.string(),
  created_at: z.date(),
}); */

export type commentType = {
  id: string;
  recipe_id: string | number;
  user_id: string | number;
  content: string;
  timeStamp: string;
};

//export type commentType = z.infer<typeof commentSchema>;

/* const zUser = z.object({
  name: z.string().min(3).max(255),
  age: z.number().min(18).max(100),
  active: z.boolean().default(false),
  access: z.enum(['admin', 'user']).default('user'),
  companyId: zId.describe('ObjectId:Company'),
  wearable: zUUID.describe('UUID:Wearable'),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.enum(['CA', 'NY', 'TX']),
  }),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
 */
