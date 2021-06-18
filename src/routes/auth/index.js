const express = require('express');

const authMiddleware = require('../../middlewares/validation/auth.middlewares')
const authController = require('../../contoller/auth.controller');

const router = express();

router.post('/signup', authMiddleware.signup, authController.signup);
router.post('/signin', authMiddleware.signin, authController.signin);

module.exports = router;