const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const env = require("./config/env");
const pool = require("./config/db");
const openApiDocument = require("./docs/openapi");
const schoolRoutes = require("./routes/school.routes");
const { errorHandler, notFoundHandler } = require("./middleware/error-handler");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: "10kb" }));
if (env.nodeEnv !== "test") {
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
}
app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "School Management API is running",
    docs: "/api-docs",
    health: "/health"
  });
});

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    status: "ok",
    uptime_seconds: Math.round(process.uptime())
  });
});

app.get("/db-health", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      database: "connected"
    });
  } catch (error) {
    next(error);
  }
});

app.get("/debug-db-config", (_req, res) => {
  const password = env.db.password || "";

  res.json({
    success: true,
    db: {
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      database: env.db.database,
      ssl: env.db.ssl,
      password_length: password.length,
      password_preview:
        password.length > 1 ? `${password[0]}...${password[password.length - 1]}` : "missing"
    }
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(schoolRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
