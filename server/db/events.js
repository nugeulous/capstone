const { client } = require("./client.js");

async function createEvent({ title, address, date, time, file, description, eventType, petType, userId }) {
    try {
      const { rows: [events] } = await client.query(`
        INSERT INTO events(title, address, date, time, file, description, eventType, petType, userId, likedByUsers) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *;
      `,
        [title, address, date, time, file, description, eventType, petType, userId, []]
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

  async function getEventsByOwnerId(userId) { // needs updating to user (User || petsitter)
    try {
      const { rows: events } = await client.query(`
        SELECT *
        FROM events
        WHERE userId=$1
      `, [userId]); // needs updating
  
      return events;
    } catch (error) {
      throw error;
    }
  }

  async function addUserLikedEvent(userId, eventId) {
    try {
        const existingLike = await client.query(`
            SELECT * FROM liked_events
            WHERE user_id = $1 AND event_id = $2;
        `, [userId, eventId]);

        if (existingLike.rows.length > 0) {
            return;
        }

        await client.query(`
            INSERT INTO liked_events (event_id, user_id)
            VALUES ($1, $2);
        `, [eventId, userId]);
    } catch (error) {
        throw error;
    }
}

async function getAllUserLikedEvents(userId) {
  try {
      const likedEvents = await client.query(
          `SELECT * FROM events
          WHERE id IN (
              SELECT event_id FROM liked_events WHERE user_id = $1
          );`,
          [userId]
      );
      return likedEvents.rows;
  } catch (error) {
      throw error;
  }
}
  
  module.exports = { createEvent, getAllEvents, getEventById, getEventsByOwnerId, addUserLikedEvent, getAllUserLikedEvents };
