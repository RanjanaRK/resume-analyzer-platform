import type { CookieOptions } from "express";

export const accessTokenOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 1000,
};

export const refreshTokenOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
};
