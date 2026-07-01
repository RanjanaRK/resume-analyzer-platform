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
