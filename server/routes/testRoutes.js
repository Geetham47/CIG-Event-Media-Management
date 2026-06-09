import express from "express";

import { adminDashboard } from "../controllers/testController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ADMIN ONLY ROUTE
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  adminDashboard
);

export default router;