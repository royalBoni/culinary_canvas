import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import {
  recipeSchema,
  chefSchema,
  likeSchema,
  commentSchema,
  followSchema,
} from "@/app/schema/recipe";
import { model } from "mongoose";

//Convert the Zod schema to a Mongoose schema
const recipeMongooseSchema = zodSchema(recipeSchema);
const chefMongooseSchema = zodSchema(chefSchema);
const likeMongooseSchema = zodSchema(likeSchema);
const commentMongooseSchema = zodSchema(commentSchema);
const followMongooseSchema = zodSchema(followSchema);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
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
      minlength: 6,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create a Mongoose model
export const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeMongooseSchema);

export const Chef =
  mongoose.models.Chef || mongoose.model("Chef", chefMongooseSchema);

export const Like =
  mongoose.models.Like || mongoose.model("Like", likeMongooseSchema);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentMongooseSchema);

export const Follow =
  mongoose.models.Follow || mongoose.model("Follow", followMongooseSchema);
