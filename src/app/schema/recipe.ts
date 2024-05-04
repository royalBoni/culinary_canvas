import z from "zod";

/**
 * Movie
 */
export const recipeSchema = z.object({
  name: z.string(),
  id: z.number(),
  description: z.string(),
  benefit: z.string(),
  preparation: z.string(),
  activeIngredient: z.string(),
  category: z.string(),
  countryOfOrigin: z.string(),
  calories: z.number(),
  cookingTime: z.number(),
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
