import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAnalytics
);

export default router;