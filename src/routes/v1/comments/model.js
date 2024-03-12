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
    post: 
      {
        type: Schema.Types.ObjectId,
        ref: RESOURCE.FORUMPOSTS,
      },
    article: 
      {
        type: Schema.Types.ObjectId,
        ref: RESOURCE.ARTICLES,
      },
    content: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model(RESOURCE.COMMENTS, schema);
