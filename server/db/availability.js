// FUNCTIONS
 const { client } = require("./client.js");

 async function createAvailability({ petsitter_id, date, start_time, end_time, is_available }) {
    try {
      const { rows: [availability] } = await client.query(`
        INSERT INTO availability(petsitter_id, date, start_time, end_time, is_available) 
        VALUES($1,
            $2,
            $3,
            $4,
            $5) 
        RETURNING *;
      `,
        [petsitter_id, date, start_time, end_time, is_available]
      );
      return availability;
    } catch (error) {
      throw error;
    }
  }

 async function getAllAvailability() {
    try {
      const { rows: availabilities } = await client.query(`
          SELECT *
          FROM availability;
      `)
      return availabilities;
    } catch (error) {
      throw error;
    }
  }

  async function getAvailablePetsitters(){
  // above function will return: availability: {rows: [{sitter info1}, {sitterinfo2}]}
    try {
      const { rows: sitter_availabilities } = await client.query(`
        SELECT ps.id, ps.fname, ps.lname, ps.image_file, av.date, av.start_time, av.end_time, av.is_available, ps.dogs, ps.cats
        FROM petsitters AS ps
        INNER JOIN availability AS av ON ps.id = av.petsitter_id
      `)
      return sitter_availabilities;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getAllAvailability,
    createAvailability,
    getAvailablePetsitters
  }