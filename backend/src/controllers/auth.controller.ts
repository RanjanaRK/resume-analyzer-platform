import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import UserModel from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { registerService } from "../service/auth.service.js";

export const register: RequestHandler = async (req, res) => {
  const {
    accessToken,
    refreshToken,
    newUser: user,
  } = await registerService(req.body);

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
};
