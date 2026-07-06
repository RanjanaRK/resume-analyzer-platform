import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import app from "./server.js";

connectDB();

app.use("/api/auth", authRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
