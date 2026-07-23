import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role: role }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role: role }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const generateEmailVerificationToken = (email: string) => {
  return jwt.sign({ email: email }, env.EMAIL_VERIFICATION_TOKEN);
};

export const generateForgotPasswordToken = (email: string) => {
  return jwt.sign({ email: email }, env.FORGOT_PASSWORD_TOKEN);
};
