const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/', userController.profile);
router.get('/profile', userController.profile);


module.exports = router;