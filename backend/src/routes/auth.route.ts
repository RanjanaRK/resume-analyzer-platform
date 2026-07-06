import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/verify-email", verifyEmail);

export default authRouter;
