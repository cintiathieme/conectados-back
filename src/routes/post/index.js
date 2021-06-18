const express = require('express');

const postsController = require('../../contoller/posts.controller');
const messageController = require('../../contoller/message.controller');

const router = express();

router.get('/', postsController.getMany);
router.post('/new-post', postsController.createOne);
router.post('/:id', messageController.createOne);
router.get('/:id', postsController.getOne);


module.exports = router;