 // imports the pg module Client to est connection with postgres db
 // Client sends queries / receives responses
const { Client } = require("pg");

// pull from prod or local pg server
const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgresql://localhost:5432/alltails",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
}); 
module.exports = { client }