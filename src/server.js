const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(`School Management API running on port ${env.port}`);
  console.log("Database config", {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    database: env.db.database,
    ssl: env.db.ssl,
    passwordLength: env.db.password.length,
    passwordPreview:
      env.db.password.length > 1
        ? `${env.db.password[0]}...${env.db.password[env.db.password.length - 1]}`
        : "missing"
  });
});
