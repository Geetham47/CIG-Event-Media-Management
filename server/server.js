import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import notificationRoutes
from "./routes/notificationRoutes.js";
import userRoutes
from "./routes/userRoutes.js";

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/comments", commentRoutes);
app.use(
  "/api/analytics",
  analyticsRoutes
);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use(
  "/api/users",
  userRoutes
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Port
const PORT = process.env.PORT || 5000;
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});