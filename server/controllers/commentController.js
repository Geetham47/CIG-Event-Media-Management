import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";
import Media from "../models/Media.js";

export const createComment = async (req, res) => {
  try {
    const { text, mediaId } = req.body;

    const comment = await Comment.create({
      text,
      media: mediaId,
    });
    const media =
  await Media.findById(
    mediaId
  );

if (media?.uploadedBy) {
  await Notification.create({
    user:
      media.uploadedBy,

    message:
      "Someone commented on your media.",
  });
}

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCommentsByMedia = async (
  req,
  res
) => {
  try {
    const comments = await Comment.find({
      media: req.params.mediaId,
    }).sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};