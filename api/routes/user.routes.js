const router   = require('express').Router();

const isLoggedIn = require('../middleware/check-auth');

// UC --> UserControllers
const UC = require('../controllers/user.controllers');

// POST --> Create a user: Sign-up
router.post('/signup', UC.createUser);

// POST --> Login user
router.post('/login', UC.loginUser);

// DELETE --> Delete user
router.delete('/:userId', isLoggedIn, UC.deleteUser);

module.exports = router;

// POST   /signup             --> Create a user
// POST   /login              --> Login user
// GET    /users              --> Fetch all users
// GET    /users/:userId      --> Fetch a single user
// DELETE /users/:userId/del  --> Delete user
