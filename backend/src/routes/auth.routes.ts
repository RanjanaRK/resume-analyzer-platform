import { Router } from "express";
import {
  getAccessTokenController,
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/verify-email", verifyEmail);

authRouter.get("/get-access-token", getAccessTokenController);

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;
