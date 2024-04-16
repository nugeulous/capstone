const { client } = require("./client.js");

async function createPost({ title, content, likes, ownerid, petsitterid }) {
    try {
        console.log("Creating a new post...");

        const { rows: [post] } = await client.query(`
            INSERT INTO posts (title, content, likes, ownerId, petsitterId)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, content, likes, ownerid, petsitterid]);

        return post;
    } catch (error) {
        console.error("Error creating a new post:", error.message);
        throw error;
    }
}

// Function to fetch all posts with associated comments
async function getAllPosts() {
    try {
        console.log("Fetching all posts...");

        const { rows: posts } = await client.query(`
            SELECT 
                posts.id AS post_id,
                posts.title,
                posts.content,
                posts.likes,
                posts.active,
                posts.ownerId,
                posts.petsitterId,
                owners.fname AS owner_fname,
                owners.lname AS owner_lname,
                petsitters.fname AS petsitter_fname,
                petsitters.lname AS petsitter_lname,
                comments.id AS comment_id,
                comments.content AS comment_content,
                comments.likes AS comment_likes
            FROM 
                posts
            LEFT JOIN 
                owners ON posts.ownerId = owners.id
            LEFT JOIN 
                petsitters ON posts.petsitterId = petsitters.id
            LEFT JOIN 
                comments ON posts.id = comments.postid;
        `);

        console.log("Fetched all posts:", posts);

        // Grouping posts by id to combine multiple comments into an array for each post
        const postsWithComments = posts.reduce((acc, post) => {
            const postId = post.post_id;
            const existingPost = acc.find((item) => item.post_id === postId);
            const { comment_id, comment_content, comment_likes, ...postWithoutComment } = post;
            const comment = {
                id: comment_id,
                content: comment_content,
                likes: comment_likes
            };

            if (existingPost) {
                existingPost.comments.push(comment);
            } else {
                acc.push({
                    ...postWithoutComment,
                    comments: [comment]
                });
            }
            return acc;
        }, []);

        return postsWithComments;
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