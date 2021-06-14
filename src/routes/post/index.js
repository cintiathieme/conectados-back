const express = require('express');

const postsController = require('../../contoller/posts.controller');

const router = express();

router.get('/', postsController.getMany);
router.get('/:id', postsController.getOne);
router.post('/', postsController.createOne);
router.put('/:id', postsController.updateOne);
router.delete('/:id', postsController.deleteOne);


module.exports = router;