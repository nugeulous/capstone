// api/index.js
const express = require('express');
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }

  next();
});

// ROUTER: /api/users
const ownersRouter = require('./owners');
apiRouter.use('/owners', ownersRouter);

// // ROUTER: /api/posts
// const postsRouter = require('./posts');
// apiRouter.use('/posts', postsRouter);

// // ROUTER: /api/tags
// const tagsRouter = require('./tags');
// apiRouter.use('/tags', tagsRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
