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
          animalType varchar(255) NOT NULL,
          breed varchar(255) NOT NULL,
          age varchar(255) NOT NULL,
          weight varchar(255) NOT NULL,
          image varchar(255),
          gender varchar(255) NOT NULL,
          sterile varchar(255) NOT NULL,
          favoriteToy varchar(255),
          favoriteTreat varchar(255),
          personality varchar(255) NOT NULL,
          ownerId INTEGER REFERENCES owners(id),
          CONSTRAINT fk_owners
            FOREIGN KEY(ownerId)
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
          image_file varchar(255),
          gender varchar(255),
          dogs boolean DEFAULT false,
          cats boolean DEFAULT false,
          role varchar(255)
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

        CREATE TABLE events (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          date DATE NOT NULL,
          time TIME NOT NULL,
          file VARCHAR(255),
          description TEXT NOT NULL,
          event_type VARCHAR(50) NOT NULL,
          pet_type VARCHAR(50),
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
        name: "Miss Thang",
        animalType: "cat",
        breed: "tabby", 
        age: "3", 
        weight: "400",
        image: "0000011010010101010101010101",
        gender: "Male",
        sterile: "No",
        favoriteToy: "Bone",
        favoriteTreat: "bacon",
        personality: "Freindly and a little shy",
        ownerId: "1"
      });

      await createPet({
        name: "Wisely", 
        animalType: "dog",
        breed: "Chihuahua", 
        age: "3", 
        weight: "12",
        image: "00000110100101010100101010101010101",
        gender: "male",
        sterile: "Yes",
        favoriteToy: "dead mouse",
        favoriteTreat: "Peanut Butter",
        personality: "Loco",
        ownerId: "1"
      });

      await createPet({
        name: "Chester",
        animalType: "dog",
        breed: "Golden Retriever", 
        age: "7", 
        weight: "36",
        image: "00000110100101010100101010101010101",
        gender: "male",
        sterile: "Yes",
        favoriteToy: "Tennis Ball",
        favoriteTreat: "Anything",
        personality: "Lovable and Loyal",
        ownerId:"2"
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
        image_file: "https://happybreath.com/wp-content/uploads/2021/04/Dog-Owner-Happy-Breath.jpg",
        gender: "non-binary",
        dogs: true,
        cats: true,
        role: null
      });

      await createPetsitter({
        email: "beeee@gmail.com",
        password: "200098!9",
        fname: "Bea",
        lname: "Joe",
        address: "San fran",
        phone: "222-333-7811",
        image_file: "https://www.thesprucepets.com/thmb/5venJp0fAeig2H01ETs8Vv7thZ4=/2546x0/filters:no_upscale():strip_icc()/dog-hi-five-FrankGaglione-getty-56a26a085f9b58b7d0c9f62e.jpg",
        gender: "girlllll",
        dogs: true,
        cats: false,
        role: null
      });

      await createPetsitter({
        email: "yoyoyooo@gmail.com",
        password: "b9dssfds30298!9",
        fname: "John",
        lname: "Jmes",
        address: "backend, USA",
        phone: "932-432-7811",
        image_file: "https://qph.cf2.quoracdn.net/main-qimg-9ec5c866cfe6d1efa0108ceade35585c",
        gender: "male",
        dogs: false,
        cats: true,
        role: null
      });

      await createPetsitter({
        email: "luvpeace24@gmail.com",
        password: "gamstop2",
        fname: "Cool",
        lname: "Sam",
        address: "NYC",
        phone: "275-333-7811",
        image_file: "https://i0.wp.com/brownsburganimalclinic.com/wp-content/uploads/2023/06/catownerFI.jpg?fit=1024%2C568&ssl=1",
        gender: "female",
        dogs: true,
        cats: true,
        role: null
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
        end_time: '14:00:00',
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

  async function createInitalEvent() {
    try {
      console.log("Starting to create events...");

      await createEvent({
        title: "Franks BDay",
        address: "Lake Meritt, Oakland CA",
        date: "May 25, 2024",
        time: "9:00 AM",
        file: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg",
        description: "Franks 12th pupday party",
        event_type: "Birthday",
        pet_type: "Hamster",
      });
      
      await createEvent({
        title: "Lucy's Birthday Bash",
        address: "Central Park, New York",
        date: "June 10, 2024",
        time: "11:00 AM",
        file: "https://images.ctfassets.net/sfnkq8lmu5d7/1SOkYVbLFsuLdn8RXjdOn9/c2c86370552871a392d3ab48a070c321/The_Wildest_Who_Is_The_Dog___s_Birthday_Party_For?w=1000&h=750&q=70&fm=webp",
        description: "Celebrating Lucy's 5th Birthday with a fun-filled party!",
        event_type: "Birthday",
        pet_type: "Dog",
      });
      
      await createEvent({
        title: "Paws & Picnic",
        address: "Griffith Park, Los Angeles",
        date: "July 15, 2024",
        time: "12:00 PM",
        file: "https://www.petpost.com.au/cdn/shop/articles/planning-a-picnic-with-your-dog-288815.jpg?v=1699415283",
        description: "Enjoy a lovely picnic with your furry friends!",
        event_type: "Pet-freindly Picnic",
        pet_type: "Dog",
      });
      
      await createEvent({
        title: "Pet Picnic in the Park",
        address: "Golden Gate Park, San Francisco",
        date: "August 20, 2024",
        time: "10:00 AM",
        file: "https://images.squarespace-cdn.com/content/v1/6439b3af348357708c9a0ec8/1690565832977-5DNFWITCQV0CSLJ9K5YT/image-asset.jpeg?format=1500w",
        description: "Join us for a delightful picnic with your pets!",
        event_type: "Pet-freindly Picnic",
        pet_type: "Cat",
      });

      await createEvent({
        title: "Mountain Trail Adventure",
        address: "Yosemite National Park, California",
        date: "July 10, 2024",
        time: "8:00 AM",
        file: "https://visitadirondacks.com/sites/default/files/styles/960x540/public/2020-02/woman-dog-high-five.jpg?itok=J_tQ1wTj",
        description: "Embark on an exhilarating hike through the breathtaking mountain trails of Yosemite!",
        event_type: "Hike",
        pet_type: "Dog",
      });
      
      await createEvent({
        title: "Forest Exploration Hike",
        address: "Great Smoky Mountains National Park, Tennessee",
        date: "August 15, 2024",
        time: "9:00 AM",
        file: "https://images.ctfassets.net/sfnkq8lmu5d7/1toXJmmMIGF2DauOIBHaTP/89fda87bb1cb72959743530e026fc363/The_Wildest_Proper_Trail_Etiquette_for_Hiking_with_Your_Dog__Stocksy_txp863b6f50CbT300_Medium_618753.jpg?w=1000&h=750&q=70&fm=webp",
        description: "Discover the wonders of the forest with this guided hike amidst the serene beauty of the Smoky Mountains!",
        event_type: "Hike",
        pet_type: "Dog",
      });
      
      await createEvent({
        title: "Canine Obedience Training Workshop",
        address: "PetSmart Training Center, Chicago",
        date: "September 5, 2024",
        time: "2:00 PM",
        file: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Female_animal_trainer_and_leopard%2C_c1906.jpg/1920px-Female_animal_trainer_and_leopard%2C_c1906.jpg",
        description: "Join us for a comprehensive training workshop focusing on building obedience skills in your canine companions!",
        event_type: "Training Workshop",
        pet_type: "Dog",
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
