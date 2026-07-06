import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import {
  generateAccessToken,
  generateEmailVerificationToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../config/env.js";
import { sendEmail } from "./mail.service.js";

export const registerService = async (data: any) => {
  try {
    const { name, email, password, role } = data;

    if (!name || !email || !password || !role) {
      throw new Error("All fields are required");
    }

    const isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      throw new Error("User already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      emailVerified: false,
    });

    const emailVerificationToken = generateEmailVerificationToken(
      newUser.email,
    );

    await sendEmail({
      to: newUser.email,
      subject: "Email Verification",
      html: ` <p>Hi ${data.name},</p>
                <p>Thank you for registering at <strong>Resume Analyzer</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Resume Analyzer Team</p>`,
    });

    return {
      newUser,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginService = async (data: any) => {
  try {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const isExisted = await UserModel.findOne({ email });

    if (!isExisted) {
      throw new Error("isExisted not found");
    }

    const isMatch = bcrypt.compareSync(password, isExisted.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    if (!isExisted.emailVerified) {
      throw new Error("Email not verified");
    }

    const accessToken = generateAccessToken(
      isExisted._id.toString(),
      isExisted.role,
    );
    const refreshToken = generateRefreshToken(
      isExisted._id.toString(),
      isExisted.role,
    );

    isExisted.refreshtoken = refreshToken;
    await isExisted.save();

    return {
      accessToken,
      refreshToken,
      isExisted,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const verifyEmailService = async (emailToken: string) => {
  try {
    const decoded = jwt.verify(
      emailToken,
      env.EMAIL_VERIFICATION_TOKEN,
    ) as JwtPayload;

    if (!decoded) {
      throw new Error("Invalid email verification token");
    }

    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.emailVerified) {
      throw new Error("Email already verified");
    }

    user.emailVerified = true;

    await user.save();

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAccesstokenService = async (refreshToken: string) => {
  let decode = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as JwtPayload;

  if (!decode) {
    throw new Error("Invalid refresh token");
  }

  // if (decode?.exp < Date.now() / 1000) {
  //   throw new Error("Refresh token expired");
  // }

  const user = await UserModel.findById(decode.id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshtoken !== refreshToken) {
    throw new Error("Unauthorized");
  }

  const accessToken = generateAccessToken(user._id.toString(), user.role);

  return accessToken;
};

export const logoutService = async (refreshToken: string) => {
  await UserModel.findOneAndUpdate(
    { refreshtoken: refreshToken },
    { refreshtoken: "" },
  );
};
