const express = require('express');
const postsRouter = express.Router();
const path = require('path'); 
const fs = require('fs');
const upload = require('./multerApi');


const {
    createPost,
    getAllPosts,
    deletePost
} = require('../db/index'); // Replace 'your-post-functions-file' with the file where your post functions are defined

// Endpoint to create a new post
postsRouter.post('/createPost', async (req, res, next) => {
    try {
        const { title, content, likes, ownerid, petsitterid } = req.body;
        const newPost = await createPost({ title, content, likes, ownerid, petsitterid });
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

// Endpoint to fetch all posts
postsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

// Endpoint to delete a post by ID
postsRouter.delete('/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        await deletePost(postId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = postsRouter;