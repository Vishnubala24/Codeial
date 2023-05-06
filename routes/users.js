const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/', userController.default);
router.get('/profile', userController.profile);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.createUser);

// use passport as middleware to authnticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
), userController.createSession)

module.exports = router;