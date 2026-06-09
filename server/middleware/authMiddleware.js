import jwt from "jsonwebtoken";
import User from "../models/User.js";

// PROTECT ROUTES
export const protect = async (req, res, next) => {
  try {
    let token;

    // CHECK TOKEN EXISTS
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIND USER
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

// AUTHORIZE ROLES
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }

    next();
  };
};