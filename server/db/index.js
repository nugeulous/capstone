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

  async function updateOwner(id, fields = {}) {
    // Set up initial update SQL
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
  
    // Return early if this is called without fields
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [owner] } = await client.query(`
        UPDATE owners
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));
  
      return owner;
    } catch (error) {
      throw error;
    }
  }
  async function getAllOwners() {
    try {
      const { rows: owners } = await client.query(`
        SELECT *
        FROM owners;
      `);
  
      return owners;
    } catch (error) {
      throw error;
    }
  }
  async function getOwnerById(id) {
    try {
      const { rows: [ owner ] } = await client.query(`
        SELECT id, email, fname, lname, location, active
        FROM owners
        WHERE id=$1
      `, [id]);
  
      if (!owner) {
        throw {
          name: "OwnerNotFoundError",
          message: "A owner with that id does not exist"
        }
      }
    
      return owner;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * PET Methods
   */
  
  async function createPet({ pet_name, pet_type, breed, age, weight, pet_owner_id }) {
    try {
      const {
        rows: [pet],
      } = await client.query(
          `
        INSERT INTO pets(pet_name, pet_type, breed, age, weight, pet_owner_id) 
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING *;
      `,
          [pet_name, pet_type, breed, age, weight, pet_owner_id]
      );
  
      return pet;
    } catch (error) {
      throw error;
    }
  }
  async function updatePet(id, fields = {}) {
    // Set up initial update SQL
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
  
    // Return early if this is called without fields
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [pet] } = await client.query(`
        UPDATE pets
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));
  
      return pet;
    } catch (error) {
      throw error;
    }
  }
  async function getAllPets() {
    try {
      const { rows: pets } = await client.query(`
        SELECT *
        FROM pets;
      `);
  
      return pets;
    } catch (error) {
      throw error;
    }
  }
  async function getPetById(id) {
    try {
      const { rows: [ pet ] } = await client.query(`
        SELECT id, pet_name, pet_type, breed, age, weight
        FROM pets
        WHERE id=$1
      `, [id]);
  
      if (!pet) {
        throw {
          name: "PetNotFoundError",
          message: "A pet with that id does not exist"
        }
      }
    
      return pet;
    } catch (error) {
      throw error;
    }
  }
  
  
  module.exports = {
    client,
    createOwner,
    updateOwner,
    getAllOwners,
    getOwnerById,
    createPet,
    updatePet,
    getAllPets,
    getPetById,

  }