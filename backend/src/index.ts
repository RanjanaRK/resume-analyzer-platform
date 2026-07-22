import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import app from "./server.js";
import express from "express";

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

const PORT = 5000;

console.log("A");
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
