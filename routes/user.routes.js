const router   = require('express').Router();

// For protecting routes that require log-in
const isLoggedIn = require('../middleware/check-auth');

// UC --> UserControllers
const UC = require('../controllers/user.controllers');

// GET /api/users --> Fetch all users
router.get('/', UC.fetchAllUsers);

// GET /api/users/:username --> Fetch a single user
router.get('/:username', UC.fetchSingleUser);

// PATCH /api/users/:username/edit --> Edit user --> Login required
router.patch('/:username/edit', isLoggedIn, UC.editUser);

// DELETE /api/users/:username/del --> Delete user --> Login required
router.delete('/:username/del', isLoggedIn, UC.deleteUser);

module.exports = router;


/*

// UserControllers routes
GET      /api/users                  --> Fetch all users
GET      /api/users/:username        --> Fetch a single user
PATCH    /api/users/:username/edit   --> Edit user
DELETE   /api/users/:username/del    --> Delete user

*/
