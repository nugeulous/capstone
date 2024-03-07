const { Client } = require("pg"); // imports the pg module

const client = new Client({
    connectionString:
        process.env.DATABASE_URL || "postgresql://localhost:5432/alltails",
    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : undefined,
  });

  async function createOwner({ email, password, fname, lname, location, phone, image, gender }) {
    try {
      const {
        rows: [owner],
      } = await client.query(
        `
        INSERT INTO owners(email, password, fname, lname, location, phone, image, gender) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
      `,
        [email, password, fname, lname, location, phone, image, gender]
      );
  
      return owner;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    client,
    createOwner,
  };

