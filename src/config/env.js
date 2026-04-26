const dotenv = require("dotenv");

dotenv.config();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const clean = (value, fallback = "") => (value ?? fallback).trim();

const env = {
  nodeEnv: clean(process.env.NODE_ENV, "development") || "development",
  port: toNumber(process.env.PORT, 3000),
  corsOrigin: clean(process.env.CORS_ORIGIN, "*") || "*",
  rateLimitWindowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  rateLimitMax: toNumber(process.env.RATE_LIMIT_MAX, 100),
  db: {
    host: clean(process.env.DB_HOST, "localhost") || "localhost",
    port: toNumber(process.env.DB_PORT, 3306),
    user: clean(process.env.DB_USER, "root") || "root",
    password: clean(process.env.DB_PASSWORD),
    database: clean(process.env.DB_NAME, "school_management") || "school_management",
    ssl: clean(process.env.DB_SSL) === "true"
  }
};

module.exports = env;
