const { client } = require("./client.js");

async function createEvent({ title, address, date, time, file, description, eventType, petType, ownerid }) {
    try {
      const { rows: [events] } = await client.query(`
        INSERT INTO events(title, address, date, time, file, description, eventType, petType, ownerid) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
      `,
        [title, address, date, time, file, description, eventType, petType, ownerid]
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

  async function getEventById(id) {
    try {
      const { rows: [ event ] } = await client.query(`
        SELECT *
        FROM events
        WHERE id=$1
      `, [id]);
  
      if (!event) {
        throw {
          name: "eventNotFoundError",
          message: "A event with that id does not exist"
        }
      }
    
      return event;
    } catch (error) {
      throw error;
    }
  }

  async function getEventsByOwnerId(ownerid) { // needs updating to user (User || petsitter)
    try {
      const { rows: events } = await client.query(`
        SELECT *
        FROM events
        WHERE ownerid=$1
      `, [ownerid]); // needs updating
  
      return events;
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = { createEvent, getAllEvents, getEventById, getEventsByOwnerId };
