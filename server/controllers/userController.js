import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import User from "../models/User.js";

export const uploadSelfie =
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message:
            "No selfie uploaded",
        });
      }

      const result =
        await new Promise(
          (resolve, reject) => {
            const uploadStream =
              cloudinary.uploader.upload_stream(
                {
                  folder:
                    "selfies",
                },
                (
                  error,
                  result
                ) => {
                  if (error)
                    reject(
                      error
                    );
                  else
                    resolve(
                      result
                    );
                }
              );

            streamifier
              .createReadStream(
                req.file
                  .buffer
              )
              .pipe(
                uploadStream
              );
          }
        );

      const user =
        await User.findById(
          req.user._id
        );

      user.selfieUrl =
        result.secure_url;

      await user.save();

      res.status(200).json({
        message:
          "Selfie uploaded successfully",
        selfieUrl:
          result.secure_url,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };