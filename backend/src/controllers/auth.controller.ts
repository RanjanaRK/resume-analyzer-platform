import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import UserModel from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString(), user.role);

    user.refreshtoken = refreshToken;
    await user.save();

    res.cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
