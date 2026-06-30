import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error(
    "ACCESS_TOKEN_SECRET is not defined in environment variables",
  );
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error(
    "REFRESH_TOKEN_SECRET is not defined in environment variables",
  );
}

type Iconfig = {
  readonly MONGO_URI: string;
  readonly ACCESS_TOKEN_SECRET: string;
  readonly REFRESH_TOKEN_SECRET: string;
};

const env: Iconfig = {
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

export default env;
