const express = require('express');

const postsController = require('../../contoller/posts.controller');

const router = express();

router.get('/', postsController.getMany);

module.exports = router;
