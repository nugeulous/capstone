module.exports = {
  ...require("./owners.js"),
  ...require("./pets.js"),
  ...require("./petsitters.js")
}
  
  // ** PETSITTER METHODS **
  async function createPetsitter({ email, password, fname, lname, location, phone, image, gender }) {
    try {
      const {
        rows: [petsitter],
      } = await client.query(
        `
        INSERT INTO petsitters(email, password, fname, lname, location, phone, image, gender) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
      `,
        [email, password, fname, lname, location, phone, image, gender]
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

  async function getPetsitterById(id){
    
    try {
      const { rows: [ petsitter ] } = await client.query(`
        SELECT id, email, fname, lname, location, phone, active
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

  // AVAILABILITY METHODS - MOVE TO NEW FILE
  async function createAvailability({ pet_name, pet_type, breed, age, weight, pet_owner_id }) {
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

  module.exports = {
    client,
    createOwner,
    updateOwner,
    getAllOwners,
    getOwner,
    getOwnerById,
    getOwnerByEmail,
    createPet,
    updatePet,
    getAllPets,
    getPetById,
    createPetsitter,
    updatePetsitter,
    getAllPetsitters,
    getPetsitterById

  }