const { client } = require("./client.js");

async function createPost({ title, content, ownerid, petsitterid }) {
    try {
        console.log("Creating a new post...");

        const { rows: [post] } = await client.query(`
            INSERT INTO posts (title, content, ownerId, petsitterId)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [title, content, ownerid, petsitterid]);

        return post;
    } catch (error) {
        console.error("Error creating a new post:", error.message);
        throw error;
    }
}

// Function to fetch all posts
async function getAllPosts() {
    try {
        console.log("Fetching all posts...");

        const { rows: posts } = await client.query(`
            SELECT 
                posts.id,
                posts.title,
                posts.content,
                posts.active,
                posts.ownerId,
                posts.petsitterId,
                owners.fname AS owner_fname,
                owners.lname AS owner_lname,
                petsitters.fname AS petsitter_fname,
                petsitters.lname AS petsitter_lname
            FROM 
                posts
            LEFT JOIN 
                owners ON posts.ownerId = owners.id
            LEFT JOIN 
                petsitters ON posts.petsitterId = petsitters.id;
        `);

        console.log("Fetched all posts:", posts);

        return posts;
    } catch (error) {
        console.error("Error fetching all posts:", error.message);
        throw error;
    }
}

async function deletePost(id) {
    try {
        console.log("Deleting post with ID:", id);

        await client.query(`
            DELETE FROM posts
            WHERE id = $1;
        `, [id]);

        console.log("Post deleted successfully!");
    } catch (error) {
        console.error("Error deleting post:", error.message);
        throw error;
    }
}

module.exports = { createPost, getAllPosts, deletePost}