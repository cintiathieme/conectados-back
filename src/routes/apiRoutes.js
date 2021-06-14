const express = require('express');

const authRoutes = require('./auth');
const homeRoutes = require('./home');
const postRoutes = require('./post');
const messageRoutes = require('./message')

const router = express();

router.use('/auth', authRoutes);
router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/message', messageRoutes);

module.exports = router;
