import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const option = {
  timestamps: true,
};

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.USERS.DEFAULT,
    },
    actionType: {
      type: String,
    },
    target: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model(RESOURCE.ACTION, schema);
