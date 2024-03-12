import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const option = {
  discriminatorKey: "__t",
  timestamps: true,
};

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Admin", "Registered", "Unregistered"],
      default: "Unregistered",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    registrationDate: {
      type: Date,
    },
    profilePath: {
      type: String,
    },
  },
  option
);

export default model(RESOURCE.USERS.DEFAULT, schema);
