const express = require('express');

const messageController = require('../../contoller/message.controller');

const router = express();

// router.get('/')
router.get('/', messageController.getMany);
router.get('/:id', messageController.getOne);
router.put('/:id', messageController.addMessage);

module.exports = router;