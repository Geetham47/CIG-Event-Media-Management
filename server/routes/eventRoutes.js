import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin", "photographer"),
  createEvent
);

router.get("/", getEvents);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "photographer"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteEvent
);

export default router;