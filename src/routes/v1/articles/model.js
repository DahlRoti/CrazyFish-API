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
    author: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.USERS.DEFAULT,
    },
    content: {
      type: String,
    },
    publicationDate: {
      type: Date,
    },
    category: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Draft", "Published"],
      default: "Not Started",
    },
    views: {
      type: Number,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.USERS.DEFAULT,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

schema.index({ title: "text" });

schema.pre("save", function (next) {
  if (
    this.isModified("status") &&
    this.status === "Published" &&
    !this.publicationDate
  ) {
    this.publicationDate = new Date();
  }
  next();
});

schema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (
    update.status === "Published" &&
    (!update.publicationDate || (update.$set && !update.$set.publicationDate))
  ) {
    this.findOneAndUpdate({}, { publicationDate: new Date() });
  }
  next();
});

export default model(RESOURCE.ARTICLES, schema);
