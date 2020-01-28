const router   = require('express').Router();

const isLoggedIn = require('../middleware/check-auth');

// AC --> AuthControllers
const AC = require('../controllers/auth.controllers');

// POST /auth/signup --> Create a user: Sign-up
router.post('/signup', AC.createUser);

// POST /auth/login --> Log user in
router.post('/login', AC.loginUser);

// POST /auth/logout --> Log user out
router.post('/logout', isLoggedIn, AC.loginUser);

module.exports = router;


/*

// AuthControllers routes
->POST   /auth/signup      --> Create a user
->POST   /auth/login       --> Log user in
->POST   /auth/logout      --> Log user out


*/
