const { client } = require("./client.js");

async function createComment({ content, postid, ownerid, petsitterid }) {
    try {
        console.log("Creating a new comment...");

        const { rows: [comment] } = await client.query(`
            INSERT INTO comments (content, postid, ownerid, petsitterid)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [content, postid, ownerid, petsitterid]);

        return comment;
    } catch (error) {
        console.error("Error creating a new comment:", error.message);
        throw error;
    }
}

module.exports = { createComment}