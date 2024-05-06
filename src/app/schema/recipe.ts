import z from "zod";

/**
 * Movie
 */
export const recipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  benefit: z.string(),
  preparation: z.string(),
  activeIngredient: z.string(),
  category: z.string(),
  countryOfOrigin: z.string(),
  calories: z.number(),
  cookingTime: z.number(),
  chefId: z.number(),
});

export type recipeType = z.infer<typeof recipeSchema>;

export const chefSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password_hash: z.string(),
  profile_image_url: z.string(),
  bio: z.string(),
  country: z.string(),
});

export type chefType = z.infer<typeof chefSchema>;

export const commentSchema = z.object({
  id: z.number(),
  recipe_id: z.number(),
  user_id: z.number(),
  content: z.string(),
  created_at: z.string(),
});

export type commentType = z.infer<typeof commentSchema>;
