import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model(
  "Comment",
  commentSchema
);

export default Comment;