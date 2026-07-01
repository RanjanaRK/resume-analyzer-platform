import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

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
    });

    const accessToken = generateAccessToken(
      newUser._id.toString(),
      newUser.role,
    );
    const refreshToken = generateRefreshToken(
      newUser._id.toString(),
      newUser.role,
    );

    newUser.refreshtoken = refreshToken;
    await newUser.save();

    return {
      accessToken,
      refreshToken,
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
