import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import express from "express";
import upload from "../middleware/upload.js";

import {
  uploadMedia,
  getAllMedia,
  getMediaByEvent,
  likeMedia,
  favoriteMedia,
  searchMedia,
  deleteMedia,
  tagUser,
  getMyPhotos,
} from "../controllers/mediaController.js";

const router =
  express.Router();

router.post(
  "/upload",
  protect,
  authorizeRoles(
    "admin",
    "photographer"
  ),
  upload.array(
    "file",
    10
  ),
  uploadMedia
);

router.get(
  "/",
  getAllMedia
);

router.get(
  "/search",
  searchMedia
);

router.get(
  "/event/:eventId",
  getMediaByEvent
);

router.get(
  "/my-photos",
  protect,
  getMyPhotos
);

router.put(
  "/like/:mediaId",
  protect,
  likeMedia
);

router.put(
  "/favorite/:mediaId",
  protect,
  favoriteMedia
);

router.put(
  "/tag/:mediaId",
  protect,
  tagUser
);
router.delete(
  "/:mediaId",
  protect,
  authorizeRoles(
    "admin",
    "photographer"
  ),
  deleteMedia
);
export default router;