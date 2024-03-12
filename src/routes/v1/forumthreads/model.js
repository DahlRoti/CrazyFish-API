import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const option = {
  timestamps: true,
};

const schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.USERS.DEFAULT,
    },
    title: {
      type: String,
    },
    images: [
      {
        name: String,
        path: String,
        size: Number,
      },
    ],
    category: {
      type: String,
      enum: ["General", "Q&A", "Case Study"],
      default: "General",
    },
    lastPostdate: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

schema.index({ title: "text" });

export default model(RESOURCE.FORUMTHREADS, schema);
