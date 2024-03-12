import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const option = {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.USERS.DEFAULT,
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.FORUMTHREADS,
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

schema.virtual("comments", {
  ref: RESOURCE.COMMENTS,
  localField: "_id",
  foreignField: "post",
});

schema.pre("find", function (next) {
  this.populate({
    path: "comments",
    match: { deleted: false },
    populate: {
      path: "author",
      select: "-password",
    },
  });
  next();
});

export default model(RESOURCE.FORUMPOSTS, schema);
