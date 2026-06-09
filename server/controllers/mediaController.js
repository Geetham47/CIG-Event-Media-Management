import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Media from "../models/Media.js";
import { generateTags } from "../services/visionService.js";
import Event from "../models/Event.js";
import Notification
from "../models/Notification.js";
import {
  detectFaces
} from "../services/visionService.js";
export const uploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const uploadedMedia = [];

    for (const file of req.files) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );

          streamifier
            .createReadStream(file.buffer)
            .pipe(uploadStream);
        });
      };

      const result =
        await uploadFromBuffer();

      console.log(
        "CLOUDINARY RESULT:",
        JSON.stringify(
          result,
          null,
          2
        )
      );

     const event =
  await Event.findById(
    req.body.eventId
  );
const userRole =
  req.user?.role ||
  "viewer";

const watermark =
  `CIG Gallery | ${event.title} | ${userRole}`;
const tags =
  generateTags(
    event,
    result.resource_type
  );
const facesDetected =
  result.resource_type ===
  "image"
    ? await detectFaces(
        result.secure_url
      )
    : [];

console.log(
  "FACES DETECTED:",
  facesDetected
);

console.log(
  "AUTO TAGS:",
  tags
);

console.log(
  "AI TAGS:",
  tags
);

const media =
  await Media.create({
    fileUrl:
      result.secure_url,

    fileType:
      result.resource_type,

    uploadedBy:
      req.user._id,

    eventId:
      req.body.eventId,

    visibility:
      req.body.visibility ||
      "public",

    watermark,

    tags,

    facesDetected,
  });

      uploadedMedia.push(
        media
      );
    }

    res.status(200).json({
      message:
        "Files uploaded and saved successfully",
      media:
        uploadedMedia,
    });
  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const getAllMedia =
  async (req, res) => {
    try {
      const media =
        await Media.find().sort({
          createdAt: -1,
        });

      res.status(200).json(
        media
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getMediaByEvent =
  async (req, res) => {
    try {
      const media =
        await Media.find({
          eventId:
            req.params.eventId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        media
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const likeMedia =
  async (req, res) => {
    try {
      const media =
        await Media.findById(
          req.params.mediaId
        );

      if (!media) {
        return res
          .status(404)
          .json({
            message:
              "Media not found",
          });
      }

      media.likesCount += 1;

      await media.save();
if (media.uploadedBy) {
  await Notification.create({
    user:
      media.uploadedBy,

    message:
      "Someone liked your photo ❤️",
  });
}

      res.status(200).json({
        likesCount:
          media.likesCount,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const favoriteMedia =
  async (req, res) => {
    try {
      const media =
        await Media.findById(
          req.params.mediaId
        );

      if (!media) {
        return res
          .status(404)
          .json({
            message:
              "Media not found",
          });
      }

      media.favoritesCount += 1;

      await media.save();

      res.status(200).json({
        favoritesCount:
          media.favoritesCount,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const searchMedia =
  async (req, res) => {
    try {
      const {
        eventId,
        fileType,
        tag,
      } = req.query;

      const query = {};

      if (eventId) {
        query.eventId =
          eventId;
      }

      if (fileType) {
        query.fileType =
          fileType;
      }

      if (tag) {
        query.tags = {
          $regex: tag,
          $options: "i",
        };
      }

      const media =
        await Media.find(
          query
        ).sort({
          createdAt: -1,
        });

      res.status(200).json(
        media
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  export const deleteMedia =
  async (req, res) => {
    try {
      const media =
        await Media.findByIdAndDelete(
          req.params.mediaId
        );

      if (!media) {
        return res.status(404).json({
          message:
            "Media not found",
        });
      }

      res.status(200).json({
        message:
          "Media deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const tagUser = async (
  req,
  res
) => {
  try {
    const { userName } =
      req.body;

    const media =
      await Media.findById(
        req.params.mediaId
      );

    if (!media) {
      return res
        .status(404)
        .json({
          message:
            "Media not found",
        });
    }

    media.taggedUsers.push(
      userName
    );

    await media.save();

    res.status(200).json(
      media
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};
export const getMyPhotos =
  async (req, res) => {
    try {
      const photos =
        await Media.find({
          taggedUsers:
            req.user.name,
        });

      res.status(200).json(
        photos
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };