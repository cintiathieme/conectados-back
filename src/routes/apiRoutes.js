const express = require('express');

const homeRoutes = require('./home')
const authRoutes = require('./auth');
const postRoutes = require('./post');
const myPostsRoutes = require('./my-posts')
const messageRoutes = require('./message')

const protectedRoutesMiddleware = require('../middlewares/protectedRoutes/protectedRoutes.middleware');

const router = express();

router.use('/home', homeRoutes);
router.use('/auth', authRoutes);

router.use(protectedRoutesMiddleware.protect);

router.use('/post', postRoutes);
router.use('/my-posts', myPostsRoutes);
router.use('/message', messageRoutes);

module.exports = router;
