import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const option = {
  timestamps: true,
};

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: [
      {
        name: String,
        path: String,
        size: Number,
      },
    ],
    filePath: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    fileName: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Manual", "Legal", "Case Study", "Calculator"],
      default: "Manual",
    },
    uploadDate: {
      type: Date,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.USERS.DEFAULT,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

schema.index({ title: "text" });

export default model(RESOURCE.RESOURCES, schema);
