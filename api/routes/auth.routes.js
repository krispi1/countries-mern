const router   = require('express').Router();

const isLoggedIn = require('../middleware/check-auth');

// AC --> AuthControllers
const AC = require('../controllers/auth.controllers');

// POST --> Create a user: Sign-up
router.post('/signup', AC.createUser);

// POST --> Log user in
router.post('/login', AC.loginUser);

// POST --> Log user out
router.post('/logout', isLoggedIn, AC.loginUser);

module.exports = router;