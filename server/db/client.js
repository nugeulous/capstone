const { Client } = require("pg"); // imports the pg module to connect with postgres db
const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgresql://localhost:5432/alltails",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
}); 
module.exports = { client }