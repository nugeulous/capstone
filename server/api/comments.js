const express = require('express');
const commentsRouter = express.Router();

const {
    createComment,
} = require('../db/index'); // Replace 'your-comment-functions-file' with the file where your comment functions are defined

// Endpoint to create a new comment
commentsRouter.post('/createComment', async (req, res, next) => {
    try {
        const { content, likes, postid, ownerid, petsitterid } = req.body;
        const newComment = await createComment({ content, likes, postid, ownerid, petsitterid });
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
});

module.exports = commentsRouter;