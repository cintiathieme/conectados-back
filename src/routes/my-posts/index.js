const express = require('express');

const postsController = require('../../contoller/posts.controller');

const router = express();

router.get('/', postsController.getMyPosts);
router.put('/:id', postsController.updateOne);
router.delete('/:id', postsController.deleteOne);

module.exports = router