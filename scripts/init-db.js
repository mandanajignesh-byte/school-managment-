const fs = require("fs/promises");
const path = require("path");
const mysql = require("mysql2/promise");
const env = require("../src/config/env");

const run = async () => {
  const schemaPath = path.join(__dirname, "..", "sql", "schema.sql");
  const schema = await fs.readFile(schemaPath, "utf8");

  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true
  });

  await connection.query(schema);
  await connection.end();

  console.log("Database and schools table are ready.");
};

run().catch((error) => {
  console.error("Failed to initialize database:", error.message);
  process.exit(1);
});
