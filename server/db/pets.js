const { client } = require("./client.js");

async function createPet({ name, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality, pet_owner_id }) {
    try {
      const {
        rows: [pet],
      } = await client.query(
          `
        INSERT INTO pets(name, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality, pet_owner_id) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *;
      `,
          [name, breed, age, weight, image, gender, favoriteToy, favoriteTreat, personality, pet_owner_id]
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
    const { rows: [pet] } = await client.query(`
        SELECT *
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
    updatePet,
    getAllPets,
    getPetById,
    createPet
  }