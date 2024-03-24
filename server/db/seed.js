// pulls from db/index.js import of connecting to postgres db
const { client } = require('./client.js')
// pulls from db/index.js options for configuration settings (host, port, username, pw)
const {options} = require("pg/lib/defaults");

const {
    createOwner,
    createPet,
    createPetsitter,
    createAvailability,
    createEvent
  } = require('./index');


async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
      DROP TABLE IF EXISTS pets; 
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS availability;
      DROP TABLE IF EXISTS petsitters;
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
          monday_1 boolean DEFAULT false,
          monday_2 boolean DEFAULT false,
          monday_3 boolean DEFAULT false,
          monday_4 boolean DEFAULT false,
          monday_5 boolean DEFAULT false,
          monday_6 boolean DEFAULT false,
          monday_7 boolean DEFAULT false,
          monday_8 boolean DEFAULT false,
          monday_9 boolean DEFAULT false,
          monday_10 boolean DEFAULT false,
          monday_11 boolean DEFAULT false,
          monday_12 boolean DEFAULT false,
          monday_13 boolean DEFAULT false,
          monday_14 boolean DEFAULT false,
          monday_15 boolean DEFAULT false,
          monday_16 boolean DEFAULT false,
          monday_17 boolean DEFAULT false,
          monday_18 boolean DEFAULT false,
          monday_19 boolean DEFAULT false,
          monday_20 boolean DEFAULT false,
          monday_21 boolean DEFAULT false,
          monday_22 boolean DEFAULT false,
          monday_23 boolean DEFAULT false,
          monday_24 boolean DEFAULT false,
            CONSTRAINT fk_petsitters
            FOREIGN KEY(petsitter_id)
            REFERENCES petsitters(id)
            ON DELETE CASCADE
          );

        CREATE TABLE events (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          date VARCHAR NOT NULL,
          time VARCHAR NOT NULL,
          photos TEXT,
          description TEXT NOT NULL,
          event_type VARCHAR(50) NOT NULL,
          pet_type VARCHAR(50) NOT NULL,
          owner_id INTEGER REFERENCES owners(id) ON DELETE CASCADE
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
        name: "Lil Snickums", 
        breed: "Schnauzer", 
        age: "3", 
        weight: "400",
        image: "0000011010010101010101010101",
        gender: "Male",
        favoriteToy: "Bone",
        favoriteTreat: "bacon",
        personality: "Freindly and a little shy",
        pet_owner_id: "1"
      });

      await createPet({
        name: "Wisely", 
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
        monday_1: true,
      });

      await createAvailability({
        petsitter_id: "2",
        monday_4: true,
        monday_5: true,
      });

      console.log("Finished creating availability!");
    } catch (error) {
      console.error("Error creating availability!");
      throw error;
    }
  }

  async function createInitalEvent() {
    try {
      console.log("Starting to create events...");

      await createEvent({
        title: "Franks BDay",
        address: "Lake Meritt, Oakland CA",
        date: "May 25, 2025",
        time: "9:00 AM",
        photos: [],
        description: "Franks 12th pupday party",
        event_type: "Birthday",
        pet_type: "Hamster",
        owner_id: 1
      });

      console.log("Finished creating events!");
    } catch (error) {
      console.error("Error creating events");
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
      await createInitalEvent();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }

rebuildDB()
  .catch(console.error);
