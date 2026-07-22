import type { RequestHandler } from "express";
import {
  getAccesstokenService,
  loginService,
  logoutService,
  registerService,
  verifyEmailService,
} from "../service/auth.service.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookiesOptions.js";

export const register: RequestHandler = async (req, res) => {
  const { newUser: user } = await registerService(req.body);

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

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
      });
    }

    await verifyEmailService(token);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAccessTokenController: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const accessToken = await getAccesstokenService(refreshToken);

    res.cookie("accesstoken", accessToken, accessTokenOptions);

    return res.status(200).json({
      message: "Access token generated",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;

    await logoutService(refreshToken);

    res.clearCookie("accesstoken", accessTokenOptions);
    res.clearCookie("refreshtoken", refreshTokenOptions);

    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const forgotPasswordController: RequestHandler = async (req, res) => {
  try {
  } catch (error) {}
};
