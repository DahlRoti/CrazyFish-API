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
      required: true,
    },
    analysisType: {
      type: String,
      required: true,
    },
    dataUsed: {
      type: String,
    },
    target: {
      type: String,
    },
    predictionModel: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model(RESOURCE.INTERACTION, schema);
