import { Router } from "express";
import {
  forgotPasswordController,
  getAccessTokenController,
  login,
  logout,
  register,
  resetPasswordController,
  verifyEmail,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.get("/verify-email", verifyEmail);

authRouter.get("/get-access-token", getAccessTokenController);

authRouter.post("/login", login);

authRouter.post("/forgot-password", forgotPasswordController);

authRouter.get("/reset-password", resetPasswordController);

authRouter.post("/logout", logout);

export default authRouter;
