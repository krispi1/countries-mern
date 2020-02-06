const router   = require('express').Router();

const isLoggedIn = require('../middleware/check-auth');

// AC --> AuthControllers
const AC = require('../controllers/auth.controllers');

// POST /api/auth/signup --> Create a user: Sign-up
router.post('/signup', AC.createUser);

// POST /api/auth/login --> Log user in
router.post('/login', AC.loginUser);

// POST /api/auth/logout --> Log user out --> Login required
router.post('/logout', isLoggedIn, AC.loginUser);

module.exports = router;


/*

// AuthControllers routes
POST   /api/auth/signup   --> Create a user
POST   /api/auth/login    --> Log user in
POST   /api/auth/logout   --> Log user out

*/
