 // PETSITTER AVAILABILITY METHODS
 const { client } = require("./client.js");

 async function createAvailability({ petsitter_id, monday_1, monday_2, monday_3, monday_4,monday_5, monday_6, monday_7, monday_8, monday_9, monday_10, monday_11, monday_12, monday_13, monday_14, monday_15, monday_16, monday_17, monday_18, monday_19, monday_20, monday_21, monday_22, monday_23, monday_24 }) {
    try {
      const {
        rows: [availability],
      } = await client.query(
          `
        INSERT INTO petsitters(petsitter_id, monday_1, monday_2, monday_3, monday_4, monday_5, monday_6, monday_7, monday_8, monday_9, monday_10, monday_11, monday_12, monday_13, monday_14, monday_15, monday_16, monday_17, monday_18, monday_19, monday_20, monday_21, monday_22, monday_23, monday_24) 
        VALUES($1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14,
            $15,
            $16,
            $17,
            $18,
            $19,
            $20,
            $21,
            $22,
            $23,
            $24) 
        RETURNING *;
      `,
          [petsitter_id, monday_1, monday_2, monday_3, monday_4, monday_5, monday_6, monday_7, monday_8, monday_9, monday_10, monday_11, monday_12, monday_13, monday_14, monday_15, monday_16, monday_17, monday_18, monday_19, monday_20, monday_21, monday_22, monday_23, monday_24]
      );
  
      return availability;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    createAvailability
  }