const router   = require('express').Router();

// For protecting routes that require log in
const isLoggedIn = require('../middleware/check-auth');

// UC --> UserControllers
const UC = require('../controllers/user.controllers');

// GET --> Fetch all users
router.get('/', UC.fetchAllUsers);

// GET --> Fetch a single user
router.get('/:userId', UC.fetchSingleUser);

// PATCH --> Edit user
router.patch('/:userId/edit', isLoggedIn, UC.editUser);

// DELETE --> Delete user
router.delete('/:userId/del', isLoggedIn, UC.deleteUser);

module.exports = router;


/*

->GET    /users              --> Fetch all users
->GET    /users/:userId      --> Fetch a single user
->PATCH  /users/:userId/edit --> Edit user
->DELETE /users/:userId/del  --> Delete user

*/