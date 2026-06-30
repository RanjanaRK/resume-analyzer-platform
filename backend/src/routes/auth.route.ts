import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  res.send("register");
});

authRouter.post("/login", (req, res) => {
  res.send("login");
});

export default authRouter;
