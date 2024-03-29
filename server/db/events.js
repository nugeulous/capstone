const { client } = require("./client.js");

async function createEvent({ title, address, date, time, photos, description, event_type, pet_type, owner_id }) {
    try {
      const { rows: [events] } = await client.query(`
        INSERT INTO events(title, address, date, time, photos, description, event_type, pet_type, owner_id) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
      `,
        [title, address, date, time, photos, description, event_type, pet_type, owner_id]
      );
      return events;
    } catch (error) {
      throw error;
    }
  }

  async function getAllEvents() {
    try {
        const {rows: events } = await client.query(`
        SELECT *
        from events;
        `);
        return events;
    } catch (error) {
        throw error;
    }
  }

  module.exports = { createEvent, getAllEvents }