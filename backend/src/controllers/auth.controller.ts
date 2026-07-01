import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import UserModel from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { loginService, registerService } from "../service/auth.service.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookiesOptions.js";

export const register: RequestHandler = async (req, res) => {
  const {
    accessToken,
    refreshToken,
    newUser: user,
  } = await registerService(req.body);

  res.cookie("accesstoken", accessToken, accessTokenOptions);

  res.cookie("refreshtoken", refreshToken, refreshTokenOptions);

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

export const login: RequestHandler = async (req, res) => {
  const { accessToken, refreshToken, isExisted } = await loginService(req.body);

  res.cookie("accesstoken", accessToken, accessTokenOptions);

  res.cookie("refreshtoken", refreshToken, refreshTokenOptions);

  return res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      name: isExisted.name,
      email: isExisted.email,
      role: isExisted.role,
    },
  });
};
