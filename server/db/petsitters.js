const { client } = require("./client.js");

async function createPetsitter({ email, password, fname, lname, address, phone, image, gender,}) {
    try {
      const {
        rows: [petsitter],
      } = await client.query(
        `
        INSERT INTO petsitters(email, password, fname, lname, address, phone, image, gender, role) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
      `,
        [email, password, fname, lname, address, phone, image, gender, "petsitter"]
      );
        
      // petsitter array [email: , pw: ]

      console.log('petsitter: ', petsitter);
      return petsitter;
    } catch (error) {
      throw error;
    }
  }
  async function getAllPetsitters() {
    try {
      const { rows: petsitters } = await client.query(`
        SELECT *
        FROM petsitters;
      `);
  
      return petsitters;
    } catch (error) {
      throw error;
    }
  }

  async function getPetsitter(email) {
    console.log(email);
    try {
    const { rows: [ petsitter ] } = await client.query(`
        SELECT *
        FROM petsitters
        WHERE email=$1
      `, [email]);
      return petsitter;
    } catch (error) {
      throw error;
    }
  }

  async function getPetsitterById(id){
    
    try {
      const { rows: [ petsitter ] } = await client.query(`
        SELECT id, email, fname, lname, address, phone, active
        FROM petsitters
        WHERE id=$1
      `, [id]);
  
      if (!petsitter) {
        throw {
          name: "PetsitterNotFoundError",
          message: "A petsitter with that id does not exist"
        }
      }
      
      return petsitter;
    } catch (error) {
      throw error;
    }
  }

  async function updatePetsitter(id, fields = {}) {
    console.log('beginning to update petsitter...')
      // Set up initial update SQL
      const setString = Object.keys(fields).map(
          (key, index) => `"${key}"=$${index + 1}`
      ).join(', ');
    
      // Return early if this is called without fields
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [petsitter] } = await client.query(`
          UPDATE petsitter
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `, Object.values(fields));
    
        return petsitter;
      } catch (error) {
        throw error;
      }
  }

  module.exports = {
    getAllPetsitters,
    getPetsitterById,
    getPetsitter,
    updatePetsitter,
    createPetsitter
  }