import z from "zod";

/**
 * Movie
 */
export const recipeSchema = z.object({
  name: z.string(),

  description: z.string(),
  benefit: z.string(),
  preparation: z.string(),
  activeIngredient: z.string(),
  category: z.string(),
  countryOfOrigin: z.string(),
});

export type recipeType = z.infer<typeof recipeSchema>;

/**
 * Movie form schema
 */
/* export const movieFormSchema = z.object({
	name: z.string().min(3),
	type: z.string()
});

export type MovieFormSchema = z.infer<typeof movieFormSchema>;
 */
