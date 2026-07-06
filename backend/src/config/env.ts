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
if (!process.env.EMAIL_VERIFICATION_TOKEN) {
  throw new Error(
    "EMAIL_VERIFICATION_TOKEN is not defined in environment variables",
  );
}
if (!process.env.SMTP_USER) {
  throw new Error("SMTP_USER is not defined in environment variables");
}

type Iconfig = {
  readonly MONGO_URI: string;
  readonly ACCESS_TOKEN_SECRET: string;
  readonly REFRESH_TOKEN_SECRET: string;
  readonly EMAIL_VERIFICATION_TOKEN: string;
  readonly SMTP_USER: string;
};

const env: Iconfig = {
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  EMAIL_VERIFICATION_TOKEN: process.env.EMAIL_VERIFICATION_TOKEN,
  SMTP_USER: process.env.SMTP_USER,
};

export default env;
