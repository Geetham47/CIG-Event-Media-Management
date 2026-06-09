import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    favoritesCount: {
      type: Number,
      default: 0,
    },
    visibility: {
  type: String,
  enum: ["public", "private"],
  default: "public",
},

watermark: {
  type: String,
  default: "",
},
    tags: [
  {
    type: String,
  },
],

taggedUsers: [
  {
    type: String,
  },
],

    facesDetected: [
      {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model(
  "Media",
  mediaSchema
);

export default Media;