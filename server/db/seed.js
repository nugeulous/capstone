const { client } = require('./index')
const {options} = require("pg/lib/defaults");

const {
    createOwner,
    updateOwner,
    getAllOwners,
    getOwnerById,
    createPet,
    updatePet,
    getAllPets,
    getPetById,
  } = require('./index');


async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
      DROP TABLE IF EXISTS pets;  
      DROP TABLE IF EXISTS owners;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }

  async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE owners (
          id SERIAL PRIMARY KEY,
          email varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          fname varchar(255) NOT NULL,
          lname varchar(255) NOT NULL,
          location varchar(255) NOT NULL,
          active boolean DEFAULT true,
          phone varchar(255) UNIQUE NOT NULL,
          image varchar(255) NOT NULL,
          gender varchar(255) NOT NULL
        );
  
        CREATE TABLE pets (
          id SERIAL PRIMARY KEY,
          pet_name varchar(255) NOT NULL,
          pet_type varchar(255) NOT NULL,
          breed varchar(255) NOT NULL,
          age varchar(255) NOT NULL,
          weight varchar(255) NOT NULL,
          pet_owner_id INTEGER REFERENCES owners(id),
          CONSTRAINT fk_owners
            FOREIGN KEY(pet_owner_id)
            REFERENCES owners(id)
            ON DELETE CASCADE
        );
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

  async function rebuildDB() {
    try {
      await client.connect(options);
  
      await dropTables();
      await createTables();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }

rebuildDB()
  .catch(console.error);