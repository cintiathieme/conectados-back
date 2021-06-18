const express = require('express');

const messageController = require('../../contoller/message.controller');

const router = express();

// router.get('/')
router.get('/', messageController.getMany);
router.get('/:id', messageController.getOne);
router.post('/:id', messageController.createOne);
// router.put('/:id', messageController.addMessage);

module.exports = router;