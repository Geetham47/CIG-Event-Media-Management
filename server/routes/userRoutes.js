import express from "express";

import {
  uploadSelfie,
} from "../controllers/userController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router =
  express.Router();

router.post(
  "/upload-selfie",
  protect,
  upload.single(
    "selfie"
  ),
  uploadSelfie
);

export default router;