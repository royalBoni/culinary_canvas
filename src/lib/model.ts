import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import //recipeSchema,
//chefSchema,
//likeSchema,
//commentSchema,
//followSchema,
"@/app/schema/recipe";
import { model } from "mongoose";

//Convert the Zod schema to a Mongoose schema
//const recipeMongooseSchema = zodSchema(recipeSchema);
//const chefMongooseSchema = zodSchema(chefSchema);
//const likeMongooseSchema = zodSchema(likeSchema);
//const commentMongooseSchema = zodSchema(commentSchema);
//const followMongooseSchema = zodSchema(followSchema);

const followSchema = new mongoose.Schema({
  follow_id: {
    type: String,
    required: true,
    unique: true,
  },
  fan_id: {
    type: String,
    required: true,
  },
  chef_id: {
    type: String,
    required: true,
  },
});

const commentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    recipe_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema({
  like_id: {
    type: String,
    required: true,
    unique: true,
  },
  recipe_id: {
    type: String,
    required: true,
  },
  liker_id: {
    type: String,
    required: true,
  },
});

const chefSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },

    id: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    bio: {
      type: String,
    },
    country: {
      type: String,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    preparation: {
      type: String,
    },
    activeIngredients: {
      type: String,
    },
    category: {
      type: String,
    },
    countryOfOrigin: {
      type: String,
    },
    calories: {
      type: Number,
    },

    benefit: {
      type: String,
    },
    cookingTIme: {
      type: Number,
    },
    chefId: {
      type: String,
    },
    img: {
      type: String,
    },
    secure_url: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create a Mongoose model
export const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export const Chef = mongoose.models.Chef || mongoose.model("Chef", chefSchema);

export const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export const Follow =
  mongoose.models.Follow || mongoose.model("Follow", followSchema);
