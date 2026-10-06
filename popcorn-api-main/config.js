require("dotenv").config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

module.exports = {
  server: {
    host: process.env.HOST || "http://localhost",
    port: Number(process.env.PORT) || 7000,
  },
  auth: {
    JWT_SECRET: required("JWT_SECRET"),
  },
  email: {
    id: required("EMAIL_ID"),
    password: required("EMAIL_PASSWORD"),
  },
  payment: {
    key: required("RAZORPAY_KEY"),
    secret: required("RAZORPAY_SECRET"),
  },
};
