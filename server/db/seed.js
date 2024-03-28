// pulls from db/index.js import of connecting to postgres db
const { client } = require('./client.js')
// pulls from db/index.js options for configuration settings (host, port, username, pw)
const {options} = require("pg/lib/defaults");

const {
    createOwner,
    createPet,
    createPetsitter,
    createAvailability
  } = require('./index');


async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
      DROP TABLE IF EXISTS pets; 
      DROP TABLE IF EXISTS owners;
      DROP TABLE IF EXISTS availability;
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
          address varchar(255) NOT NULL,
          active boolean DEFAULT true,
          phone varchar(255) UNIQUE NOT NULL,
          image varchar(255),
          gender varchar(255),
          role varchar(50)
        );
  
        CREATE TABLE pets (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          type varchar(255) NOT NULL,
          breed varchar(255) NOT NULL,
          age varchar(255) NOT NULL,
          weight varchar(255) NOT NULL,
          image varchar(255),
          gender varchar(255) NOT NULL,
          favoriteToy varchar(255),
          favoriteTreat varchar(255),
          personality varchar(255) NOT NULL,
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
          address varchar(255) NOT NULL,
          active boolean DEFAULT true,
          phone varchar(255) UNIQUE NOT NULL,
          image varchar(255),
          gender varchar(255),
          snakes_petsitter boolean DEFAULT false,
          role varchar(50)
        );

        CREATE TABLE availability (
          id SERIAL PRIMARY KEY,
          petsitter_id INTEGER REFERENCES petsitters(id),
          date DATE,
          start_time TIME,
          end_time TIME,
          is_available BOOLEAN DEFAULT false,
            CONSTRAINT fk_petsitters
            FOREIGN KEY(petsitter_id)
            REFERENCES petsitters(id)
            ON DELETE CASCADE
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
        address: "Sidney, Australia",
        phone: "123-456-7891",
        image: "01110101100001110111101010101010",
        gender: "all of them"
      });
      await createOwner({
        email: "sandra@gmail.com",
        password: "sandy123",
        fname: "Sandreth",
        lname: "Sannington",
        address: "Perth, Australia",
        phone: "123-456-7111",
        image: "010101010101010101010111010110",
        gender: "all of them"
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
        name: "Miss Thang",
        type: "cat",
        breed: "tabby", 
        age: "3", 
        weight: "400",
        image: "0000011010010101010101010101",
        gender: "Female",
        favoriteToy: "Bone",
        favoriteTreat: "bacon",
        personality: "Freindly and a little shy",
        pet_owner_id: "1"
      });

      await createPet({
        name: "Wisely", 
        type: "dog",
        breed: "Chihuahua", 
        age: "3", 
        weight: "12",
        image: "00000110100101010100101010101010101",
        gender: "male",
        favoriteToy: "dead mouse",
        favoriteTreat: "Peanut Butter",
        personality: "Loco",
        pet_owner_id: "1"
      });

      await createPet({
        name: "Chester",
        type: "dog",
        breed: "Golden Retriever", 
        age: "7", 
        weight: "36",
        image: "00000110100101010100101010101010101",
        gender: "male",
        favoriteToy: "Tennis Ball",
        favoriteTreat: "Anything",
        personality: "Lovable and Loyal",
        pet_owner_id:"2"
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
        address: "Sactown, CA",
        phone: "916-432-7811",
        image: "imagery",
        gender: "non-binary",
      });

      await createPetsitter({
        email: "beeee@gmail.com",
        password: "200098!9",
        fname: "Bea",
        lname: "Joe",
        address: "San fran",
        phone: "222-333-7811",
        image: "pictcha",
        gender: "girlllll",
      });

      await createPetsitter({
        email: "yoyoyooo@gmail.com",
        password: "b9dssfds30298!9",
        fname: "John",
        lname: "Jmes",
        address: "backend, USA",
        phone: "932-432-7811",
        image: "pcturee",
        gender: "male",
        dogs: false,
        cats: true
      });

      await createPetsitter({
        email: "luvpeace24@gmail.com",
        password: "gamstop2",
        fname: "Cool",
        lname: "Sam",
        address: "NYC",
        phone: "275-333-7811",
        image: "a pic",
        gender: "female",
        dogs: true,
        cats: false
      });

      console.log("Finished creating petsitters!");
    } catch (error) {
      console.error("Error creating petsitters!");
      throw error;
    }
  }

  async function createInitialAvailability() {
    try {
      console.log("Starting to create availability...");
  
      await createAvailability({
        petsitter_id: "1",
        date: '10-10-24',
        start_time: '09:00:00',
        end_time: '5:00:00',
        is_available: true
      });

      await createAvailability({
        petsitter_id: "2",
        date: '09-17-24',
        start_time: '8:00:00',
        end_time: '12:00:00',
        is_available: true
      });

      await createAvailability({
        petsitter_id: "3",
        date: '01-08-24',
        start_time: '12:00:00',
        end_time: '16:00:00',
        is_available: true
      });

      await createAvailability({
        petsitter_id: "4",
        date: '10-10-24',
        start_time: '14:00:00',
        end_time: '24:00:00',
        is_available: true
      });

      console.log("Finished creating availability!");
    } catch (error) {
      console.error("Error creating availability!");
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
      await createInitialAvailability();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }

rebuildDB()
  .catch(console.error);
