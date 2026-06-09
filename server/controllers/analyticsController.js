import Event from "../models/Event.js";
import Media from "../models/Media.js";
import Comment from "../models/Comment.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalEvents =
      await Event.countDocuments();

    const totalMedia =
      await Media.countDocuments();

    const totalComments =
      await Comment.countDocuments();

    const media =
      await Media.find();

    const totalLikes =
      media.reduce(
        (sum, item) =>
          sum + (item.likesCount || 0),
        0
      );

    const totalFavorites =
      media.reduce(
        (sum, item) =>
          sum +
          (item.favoritesCount || 0),
        0
      );

    const images =
      media.filter(
        (item) =>
          item.fileType === "image"
      ).length;

    const videos =
      media.filter(
        (item) =>
          item.fileType === "video"
      ).length;

    const publicMedia =
      media.filter(
        (item) =>
          item.visibility === "public"
      ).length;

    const privateMedia =
      media.filter(
        (item) =>
          item.visibility === "private"
      ).length;

    res.status(200).json({
      totalEvents,
      totalMedia,
      totalComments,
      totalLikes,
      totalFavorites,
      images,
      videos,
      publicMedia,
      privateMedia,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};