const router   = require('express').Router();

// AC --> AuthControllers
const AC = require('../controllers/auth.controllers');

// POST --> Create a user: Sign-up
router.post('/signup', AC.createUser);

// POST --> Login user
router.post('/login', AC.loginUser);

module.exports = router;

// POST   /signup             --> Create a user
// POST   /login              --> Login user
