const router   = require('express').Router();

// For protecting routes that require log-in
const isLoggedIn = require('../middleware/check-auth');

// UC --> UserControllers
const UC = require('../controllers/user.controllers');

// GET /users --> Fetch all users
router.get('/', UC.fetchAllUsers);

// GET /users/:username --> Fetch a single user
router.get('/:username', UC.fetchSingleUser);

// PATCH /users/:username/edit --> Edit user --> Login required
router.patch('/:username/edit', isLoggedIn, UC.editUser);

// DELETE /users/:username/del --> Delete user --> Login required
router.delete('/:username/del', isLoggedIn, UC.deleteUser);

module.exports = router;


/*

// UserControllers routes
GET      /users                  --> Fetch all users
GET      /users/:username        --> Fetch a single user
PATCH    /users/:username/edit   --> Edit user
DELETE   /users/:username/del    --> Delete user

*/
