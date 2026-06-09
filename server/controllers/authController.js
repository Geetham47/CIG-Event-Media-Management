import User from "../models/User.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  console.log("REGISTER HIT");
  console.log(req.body);

  try {
    const { name, email, password, role } =
      req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const user =
      await User.create({
        name,
        email,
        password,
        role,
      });

    const token =
      user.generateToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "REGISTER ERROR:"
    );
    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Please provide email and password",
      });
    }

    const user =
      await User.findOne({
        email,
      }).select(
        "+password"
      );

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const token =
      user.generateToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "LOGIN ERROR:"
    );
    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};