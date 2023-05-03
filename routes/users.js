const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/', userController.default);
router.get('/profile', userController.profile);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.createUser);

module.exports = router;