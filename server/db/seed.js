// pulls from db/index.js import of connecting to postgres db
const { client } = require('./index')
// pulls from db/index.js options for configuration settings (host, port, username, pw)
const {options} = require("pg/lib/defaults");

const {
    createOwner,
    createPet,
    createPetsitter
  } = require('./index');


async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
      DROP TABLE IF EXISTS pets; 
      DROP TABLE IF EXISTS owners;
      DROP TABLE IF EXISTS petsitters;

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
          location varchar(255),
          active boolean DEFAULT true,
          phone varchar(255) UNIQUE NOT NULL,
          image varchar(255),
          gender varchar(255)
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

        CREATE TABLE petsitters (
          id SERIAL PRIMARY KEY,
          email varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          fname varchar(255) NOT NULL,
          lname varchar(255) NOT NULL,
          location varchar(255) NOT NULL,
          active boolean DEFAULT true,
          phone varchar(255) UNIQUE NOT NULL,
          image varchar(255) NOT NULL,
          gender varchar(255) NOT NULL,
          snakes_petsitter boolean DEFAULT false
        );

      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

  async function createInitialOwners() {
    try {
      console.log("Starting to create users...");
  
      await createOwner({
        email: "albert@gmail.com",
        password: "bertie99",
        fname: "Albathy",
        lname: "Bertrude",
        location: "Sidney, Australia",
        phone: "123-456-7891",
        image: "somedayIWillBeARealImage.com",
        gender: "all of them"
      });
      await createOwner({
        email: "sandra@gmail.com",
        password: "sandy123",
        fname: "Sandreth",
        lname: "Sannington",
        location: "Perth, Australia",
        phone: "123-456-7111",
        image: "somedayIWillBeARealImage2.com",
        gender: "all of them"
      });
      await createOwner({
        email: "glamgal@gmail.com",
        password: "soglam123",
        fname: "Glammoth",
        lname: "Galilei",
        location: "Melbourne, Australia",
        phone: "123-456-7222",
        image: "somedayIWillBeARealImage3.com",
        gender: "yeah right i aint tellin u"
      });
  
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    }
  }

  async function createInitialPets() {
    try {
      console.log("Starting to create pets...");
  
      await createPet({
        pet_name:"Lil Snickums", 
        pet_type:"dog", 
        breed:"Schnauzer", 
        age:"3", 
        weight:"400", 
        pet_owner_id:"1"
      });

      await createPet({
        pet_name:"Wisely", 
        pet_type:"dog", 
        breed:"Chihuahua", 
        age:"400", 
        weight:"3", 
        pet_owner_id:"1"
      });

      await createPet({
        pet_name:"The Colonel", 
        pet_type:"dog", 
        breed:"Black Labrador", 
        age:"11", 
        weight:"50", 
        pet_owner_id:"3"
      });

      await createPet({
        pet_name:"Chester", 
        pet_type:"dog", 
        breed:"Golden Retriever", 
        age:"1", 
        weight:"69", 
        pet_owner_id:"2"
      });

      await createPet({
        pet_name:"Sergeant Barko", 
        pet_type:"dog", 
        breed:"Poodle", 
        age:"13", 
        weight:"9001", 
        pet_owner_id:"3"
      });
  
      console.log("Finished creating pets!");
    } catch (error) {
      console.error("Error creating pets!");
      throw error;
    }
  }

  async function createInitialPetsitters() {
    try {
      console.log("Starting to create petsitters...");
  
      await createPetsitter({
        email: "sammy@gmail.com",
        password: "b930298!9",
        fname: "Samuel",
        lname: "Jackson",
        location: "Sactown, CA",
        phone: "916-432-7811",
        image: "imagery",
        gender: "non-binary",
      });

      await createPetsitter({
        email: "beeee@gmail.com",
        password: "200098!9",
        fname: "Bea",
        lname: "Joe",
        location: "San fran",
        phone: "222-333-7811",
        image: "pictcha",
        gender: "girlllll",
      });

      console.log("Finished creating petsitters!");
    } catch (error) {
      console.error("Error creating petsitters!");
      throw error;
    }
  }

  async function rebuildDB() {
    try {
      await client.connect(options);
      await dropTables();
      await createTables();
      await createInitialOwners();
      await createInitialPets();
      await createInitialPetsitters();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }

rebuildDB()
  .catch(console.error);
