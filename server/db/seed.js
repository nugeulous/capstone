// pulls from db/index.js import of connecting to postgres db
const { client } = require('./client.js')
// pulls from db/index.js options for configuration settings (host, port, username, pw)
const {options} = require("pg/lib/defaults");

const {
    createOwner,
    createPet,
    createPetsitter,
    createAvailability,
    createEvent,
    createPost,
    createOrder,
    createComment,
  } = require('./index');


async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`      
      DROP TABLE IF EXISTS comments CASCADE;
      DROP TABLE IF EXISTS posts CASCADE;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS pets; 
      DROP TABLE IF EXISTS liked_events;
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
          file varchar(255),
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
          file varchar(255),
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
          file varchar(255),
          gender varchar(255),
          dogs boolean DEFAULT false,
          cats boolean DEFAULT false,
          aboutMe varchar(2000) NULL,
          tagLine varchar(2000) NULL,
          hourlyCost INTEGER NULL,
          role varchar(255)
        );

        CREATE TABLE availability (
          id SERIAL PRIMARY KEY,
          petsitter_id INTEGER REFERENCES petsitters(id),
          start_date DATE,
          end_date DATE,
          start_time TIME,
          end_time TIME,
            CONSTRAINT fk_petsitters
            FOREIGN KEY(petsitter_id)
            REFERENCES petsitters(id)
            ON DELETE CASCADE
          );

        CREATE TABLE events (
          id SERIAL PRIMARY KEY,
          title VARCHAR(26) NOT NULL,
          address TEXT NOT NULL,
          date DATE NOT NULL,
          time TIME NOT NULL,
          file VARCHAR(255),
          description TEXT NOT NULL,
          eventType VARCHAR(50) NOT NULL,
          petType VARCHAR(50),
          userId INTEGER REFERENCES owners(id) ON DELETE CASCADE,
          likedByUsers INTEGER[] 
        );

        CREATE TABLE liked_events (
          id SERIAL PRIMARY KEY,
          event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
          user_id INTEGER REFERENCES owners(id) ON DELETE CASCADE,
          UNIQUE(event_id, user_id)
        );

        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          service_type varchar(255),
          start_date varchar(255),
          end_date varchar(255),
          start_time varchar(255),
          end_time varchar(255), 
          pet_type varchar(255),
          petsitter_fname varchar(255),
          price varchar(255), 
          paid varchar(255) DEFAULT 'true',
          order_owner_id INTEGER REFERENCES owners(id),
          CONSTRAINT fk_owners
            FOREIGN KEY(order_owner_id)
            REFERENCES owners(id)
            ON DELETE CASCADE
           );

        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          likes INTEGER,
          file varchar(255),
          active BOOLEAN DEFAULT true,
          ownerid INTEGER,
          petsitterid INTEGER,
          CONSTRAINT fk_owners
            FOREIGN KEY(ownerid)
            REFERENCES owners(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_petsitters
            FOREIGN KEY(petsitterid)
            REFERENCES petsitters(id)
            ON DELETE CASCADE
        );

        CREATE TABLE comments (
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          likes INTEGER,
          postid INTEGER REFERENCES posts(id) ON DELETE CASCADE,
          ownerid INTEGER REFERENCES owners(id) ON DELETE CASCADE,
          petsitterid INTEGER REFERENCES petsitters(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        password: "$2b$10$IoqOgdqBbkKCm9ZIJpChjuHTcWKUtdp88yJZYCgjLFkDAbHiWnzZO", // bertie99
        fname: "Albathy",
        lname: "Bertrude",
        address: "Sidney, Australia",
        phone: "123-456-7891",
        file: "01110101100001110111101010101010",
        gender: "all of them"
      });
      await createOwner({
        email: "sandra@gmail.com",
        password: "sandy123",
        fname: "Sandreth",
        lname: "Sannington",
        address: "Perth, Australia",
        phone: "123-456-7111",
        file: "010101010101010101010111010110",
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
        file: "0000011010010101010101010101",
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
        file: "00000110100101010100101010101010101",
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
        file: "00000110100101010100101010101010101",
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
        file: "https://happybreath.com/wp-content/uploads/2021/04/Dog-Owner-Happy-Breath.jpg",
        gender: "non-binary",
        dogs: true,
        cats: true,
        aboutMe: "American actor, producer, and director. In a career spanning over four decades, Washington has received numerous accolades, including a Tony Award, two Academy Awards, three Golden Globe Awards and two Silver Bears.[1] He was honored with the Cecil B. DeMille Lifetime Achievement Award in 2016, the AFI Life Achievement Award in 2019, and in 2020 The New York Times named him the greatest actor of the 21st century.[2] In 2022, Washington received the Presidential Medal of Freedom.",
        tagLine: "Dogs are life",
        hourlyCost: 15,
        role: null
      });

      await createPetsitter({
        email: "beeee@gmail.com",
        password: "200098!9",
        fname: "Bea",
        lname: "Joe",
        address: "San fran",
        phone: "222-333-7811",
        file: "https://www.thesprucepets.com/thmb/5venJp0fAeig2H01ETs8Vv7thZ4=/2546x0/filters:no_upscale():strip_icc()/dog-hi-five-FrankGaglione-getty-56a26a085f9b58b7d0c9f62e.jpg",
        gender: "girlllll",
        dogs: true,
        cats: false,
        aboutMe: "American singer-songwriter. A subject of widespread public interest, she has influenced the music industry and popular culture through her artistry, songwriting and entrepreneurship. She is an advocate of artists' rights and women's empowerment.",
        tagLine: "proud cat lady",
        hourlyCost: 22,
        role: null
      });

      await createPetsitter({
        email: "yoyoyooo@gmail.com",
        password: "b9dssfds30298!9",
        fname: "César",
        lname: "Favela",
        address: "backend, USA",
        phone: "932-432-7811",
        file: "https://qph.cf2.quoracdn.net/main-qimg-9ec5c866cfe6d1efa0108ceade35585c",
        gender: "male",
        dogs: false,
        cats: true,
        aboutMe: "César Felipe Millán Favela is a Mexican-American dog psychologist. He is widely known for his Emmy-nominated television series Dog Whisperer with Cesar Millan, which was produced from 2004 to 2012 and is broadcast in more than 80 countries worldwide.",
        tagLine: "Two words: Dog. Whisperer.",
        hourlyCost: 25,
        role: null
      });

      await createPetsitter({
        email: "luvpeace24@gmail.com",
        password: "gamstop2",
        fname: "Cool",
        lname: "Sam",
        address: "NYC",
        phone: "275-333-7811",
        file: "https://i0.wp.com/brownsburganimalclinic.com/wp-content/uploads/2023/06/catownerFI.jpg?fit=1024%2C568&ssl=1",
        gender: "female",
        dogs: true,
        cats: true,
        aboutMe: "Victoria Stilwell (born 20 July 1969) is an English author, dog trainer and television presenter. Stilwell has appeared as a pet behavior expert and served as a producer on several international TV series including Dogs Might Fly (Sky TV), Dogs With Extraordinary Jobs (Smithsonian Channel), and Greatest American Dog (CBS), and is best known as the star and creator of the dog training TV show It's Me or the Dog.",
        tagLine: "It's me or the dog",
        hourlyCost: 20,
        role: null
      });

      await createPetsitter({
        email: "helen24@aol.com",
        password: "dfsitTop2",
        fname: "Dasha",
        lname: "Glass",
        address: "San Francisco, CA",
        phone: "233-443-7831",
        file: "https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=6a19aa0e164cc51f2a2770b8bff5776d",
        gender: "female",
        dogs: false,
        cats: true,
        aboutMe:"I'm Dasha, the leader of The Savitsky Cats. We are the family of super trained cats and humans. Originally, we all are from the Ukraine, and now we are in United States!",
        tagLine:"Happy to be here",
        hourlyCost: 30,
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
        start_date: '01-10-24',
        end_date: '12-12-24',
        start_time: '09:00:00',
        end_time: '14:00:00',
      });

      await createAvailability({
        petsitter_id: "2",
        start_date: '01-10-24',
        end_date: '12-12-24',
        start_time: '8:00:00',
        end_time: '12:00:00',
      });

      await createAvailability({
        petsitter_id: "3",
        start_date: '01-10-24',
        end_date: '12-12-24',
        start_time: '12:00:00',
        end_time: '16:00:00',
      });

      await createAvailability({
        petsitter_id: "4",
        start_date: '01-10-24',
        end_date: '12-12-24',
        start_time: '14:00:00',
        end_time: '23:00:00',
      });

      await createAvailability({
        petsitter_id: "5",
        start_date: '01-10-24',
        end_date: '12-12-24',
        start_time: '14:00:00',
        end_time: '23:00:00',
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
        eventType: "Birthday",
        petType: "Hamster",
        userId: "1",
      });
      
      await createEvent({
        title: "Lucy's Birthday Bash",
        address: "Central Park, New York",
        date: "June 10, 2024",
        time: "11:00 AM",
        file: "https://images.ctfassets.net/sfnkq8lmu5d7/1SOkYVbLFsuLdn8RXjdOn9/c2c86370552871a392d3ab48a070c321/The_Wildest_Who_Is_The_Dog___s_Birthday_Party_For?w=1000&h=750&q=70&fm=webp",
        description: "Celebrating Lucy's 5th Birthday with a fun-filled party!",
        eventType: "Birthday",
        petType: "Dog",
        userId: "1",
      });
      
      await createEvent({
        title: "Paws & Picnic",
        address: "Griffith Park, Los Angeles",
        date: "July 15, 2024",
        time: "12:00 PM",
        file: "https://www.petpost.com.au/cdn/shop/articles/planning-a-picnic-with-your-dog-288815.jpg?v=1699415283",
        description: "Enjoy a lovely picnic with your furry friends!",
        eventType: "Pet-freindly Picnic",
        petType: "Dog",
        userId: "1",
      });
      
      await createEvent({
        title: "Pet Picnic in the Park",
        address: "Golden Gate Park, San Francisco",
        date: "August 20, 2024",
        time: "10:00 AM",
        file: "https://images.squarespace-cdn.com/content/v1/6439b3af348357708c9a0ec8/1690565832977-5DNFWITCQV0CSLJ9K5YT/image-asset.jpeg?format=1500w",
        description: "Join us for a delightful picnic with your pets!",
        eventType: "Pet-freindly Picnic",
        petType: "Cat",
        userId: "2",
      });

      await createEvent({
        title: "Mountain Trail Adventure",
        address: "Yosemite National Park, California",
        date: "July 10, 2024",
        time: "8:00 AM",
        file: "https://visitadirondacks.com/sites/default/files/styles/960x540/public/2020-02/woman-dog-high-five.jpg?itok=J_tQ1wTj",
        description: "Embark on an exhilarating hike through the breathtaking mountain trails of Yosemite!",
        eventType: "Hike",
        petType: "Dog",
        userId: "2",
      });
      
      await createEvent({
        title: "Forest Exploration Hike",
        address: "Great Smoky Mountains National Park, Tennessee",
        date: "August 15, 2024",
        time: "9:00 AM",
        file: "https://images.ctfassets.net/sfnkq8lmu5d7/1toXJmmMIGF2DauOIBHaTP/89fda87bb1cb72959743530e026fc363/The_Wildest_Proper_Trail_Etiquette_for_Hiking_with_Your_Dog__Stocksy_txp863b6f50CbT300_Medium_618753.jpg?w=1000&h=750&q=70&fm=webp",
        description: "Discover the wonders of the forest with this guided hike amidst the serene beauty of the Smoky Mountains!",
        eventType: "Hike",
        petType: "Dog",
        userId: "2",
      });
      
      await createEvent({
        title: "Canine Obedience Training",
        address: "PetSmart Training Center, Chicago",
        date: "September 5, 2024",
        time: "2:00 PM",
        file: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Female_animal_trainer_and_leopard%2C_c1906.jpg/1920px-Female_animal_trainer_and_leopard%2C_c1906.jpg",
        description: "Join us for a comprehensive training workshop focusing on building obedience skills in your canine companions!",
        eventType: "Training Workshop",
        petType: "Dog",
        userId: "2",
      });      
            

      console.log("Finished creating events!");
    } catch (error) {
      console.error("Error creating events");
      throw error;
    }
  }

  async function createInitialPosts() {
    try {
        console.log("Starting to create initial posts...");

        // Fetch the names of owners and petsitters from the database
        const owner1 = await client.query("SELECT fname, lname FROM owners WHERE id = 1");
        const owner2 = await client.query("SELECT fname, lname FROM owners WHERE id = 2");
        const petsitter1 = await client.query("SELECT fname, lname FROM petsitters WHERE id = 1");
        const petsitter2 = await client.query("SELECT fname, lname FROM petsitters WHERE id = 2");

        // Create initial posts with associated names
        await createPost({
            title: "Welcome to the Pet Lovers Community!",
            content: "We're thrilled to welcome you to our community of pet lovers. Feel free to introduce yourself and share stories about your beloved pets.",
            likes:100,
            ownerid: 1, // Assuming ownerId 1 corresponds to the first owner created in the database
            ownerName: `${owner1.rows[0].fname} ${owner1.rows[0].lname}`
        });

        await createPost({
            title: "Tips for a Healthy Cat Diet",
            content: "Here are some tips to ensure your feline friend is getting the nutrients they need for a healthy diet. Remember, a well-fed cat is a happy cat!",
            likes:12,
            ownerid: 1, // Assuming ownerId 1 corresponds to the first owner created in the database
            ownerName: `${owner1.rows[0].fname} ${owner1.rows[0].lname}`
        });

        await createPost({
            title: "Finding the Right Dog Walker",
            content: "Looking for a reliable dog walker? Share your experiences and recommendations here!",
            likes:47,
            ownerid: 2, // Assuming ownerId 2 corresponds to the second owner created in the database
            ownerName: `${owner2.rows[0].fname} ${owner2.rows[0].lname}`
        });

        await createPost({
            title: "Exciting News: New Dog Walking Slots Available!",
            content: "I'm excited to announce that I have openings for dog walking sessions starting next week. Contact me to schedule your furry friend's walk!",
            likes:2,
            petsitterid: 1, // Assuming petsitterId 1 corresponds to the first petsitter created in the database
            petsitterName: `${petsitter1.rows[0].fname} ${petsitter1.rows[0].lname}`
        });

        await createPost({
            title: "Cat Sitting Services Available",
            content: "Need someone to care for your feline companion while you're away? Look no further! I offer reliable and loving cat sitting services.",
            likes:12,
            petsitterid: 2, // Assuming petsitterId 2 corresponds to the second petsitter created in the database
            petsitterName: `${petsitter2.rows[0].fname} ${petsitter2.rows[0].lname}`
        });

        console.log("Finished creating initial posts!");
    } catch (error) {
        console.error("Error creating initial posts!");
        throw error;
    }
}


  async function createInitialOrders(){
    try {
      console.log("Starting to create orders...");

      await createOrder({
        service_type:"walk",
        start_date:"10/10/2024",
        end_date:"",
        start_time:"10:00AM",
        end_time:"12:00PM", 
        pet_type:"Dog",
        petsitter_fname:"Samuel",
        price:"$4200", 
        paid:"wait... what dude?",
        order_owner_id:"1" 
      });

      await createOrder({
        service_type:"groom",
        start_date:"10/11/2024",
        end_date:"",
        start_time:"10:00AM",
        end_time:"12:00PM", 
        pet_type:"Wooly Mammoth",
        petsitter_fname:"Major Lazer",
        price:"9001", 
        paid:"its... ITS OVER 9000",
        order_owner_id:"1" 
      });

      await createOrder({
        service_type:"sitter",
        start_date:"10/11/2024",
        end_date:"10/14/2024",
        start_time:"",
        end_time:"", 
        pet_type:"Cat",
        petsitter_fname:"Bea",
        price:"6900", 
        paid:"Nice",
        order_owner_id:"1" 
      });

      await createOrder({
        service_type:"walk",
        start_date:"10/11/2024",
        end_date:"",
        start_time:"10:00AM",
        end_time:"12:00PM", 
        pet_type:"Basilisk",
        petsitter_fname:"Moufoy",
        price:"-less", 
        paid:"...with blood",
        order_owner_id:"2" 
      });

      await createOrder({
        service_type:"train",
        start_date:"10/12/2024",
        end_date:"",
        start_time:"10:00AM",
        end_time:"12:00PM", 
        pet_type:"troll",
        petsitter_fname:"Timothee",
        price:"3 riddles", 
        paid:"the troll toll",
        order_owner_id:"2" 
      });

      await createOrder({
        service_type:"sitter",
        start_date:"10/11/2024",
        end_date:"10/14/2024",
        start_time:"",
        end_time:"", 
        pet_type:"Mantis Shrimp",
        petsitter_fname:"PETCO guy",
        price:"Bullet Proof Aquarium", 
        paid:"PENDING",
        order_owner_id:"2" 
      });

      console.log("Finished creating orders!");
    } catch (error) {
      console.error("Error creating orders");
      throw error;
    }
  }

  async function createInitialComments() {
    try {
        console.log("Starting to create initial comments...");

        // Fetch the IDs of posts from the database
        const post1 = await client.query("SELECT id FROM posts WHERE title = 'Welcome to the Pet Lovers Community!'");
        const post2 = await client.query("SELECT id FROM posts WHERE title = 'Tips for a Healthy Cat Diet'");
        const post3 = await client.query("SELECT id FROM posts WHERE title = 'Finding the Right Dog Walker'");
        const post4 = await client.query("SELECT id FROM posts WHERE title = 'Exciting News: New Dog Walking Slots Available!'");
        const post5 = await client.query("SELECT id FROM posts WHERE title = 'Cat Sitting Services Available'");

        // Fetch the IDs of owners from the database
        const owner1 = await client.query("SELECT id FROM owners WHERE fname = 'Albathy'");
        const owner2 = await client.query("SELECT id FROM owners WHERE fname = 'Sandreth'");

        // Create initial comments with associated post and owner IDs
        await createComment({
            content: "Great community! Looking forward to connecting with other pet lovers.",
            postid: post1.rows[0].id,
            ownerid: owner1.rows[0].id
        });

        await createComment({
            content: "Thanks for sharing these helpful tips!",
            postid: post2.rows[0].id,
            ownerid: owner2.rows[0].id
        });

        await createComment({
            content: "Nice post! I'm currently looking for a dog walker too.",
            postid: post3.rows[0].id,
            ownerid: owner2.rows[0].id
        });

        await createComment({
            content: "Exciting news indeed! Do you offer group walks or just individual ones?",
            postid: post4.rows[0].id,
            ownerid: owner1.rows[0].id
        });

        await createComment({
            content: "I might need your services soon. How can I contact you?",
            postid: post5.rows[0].id,
            ownerid: owner1.rows[0].id
        });

        console.log("Finished creating initial comments!");
    } catch (error) {
        console.error("Error creating initial comments!");
        throw error;
    }
}
  
  async function rebuildDB() {
    try {
      console.log("Starting rebuildDb...")
      await client.connect(options);
      await dropTables();
      await createTables();
      await createInitialOwners();
      await createInitialPets();
      await createInitialPetsitters();
      await createInitialAvailability();
      await createInitalEvent();
      await createInitialPosts();
      await createInitialOrders();
      await createInitialComments(); // Add this line to create initial comments
      console.log("Finished rebuildDb! SEEDING COMPLETE.")
  
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }
  
  rebuildDB()
    .catch(console.error);