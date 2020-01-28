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

->GET    /users               --> Fetch all users
->GET    /users/:userId       --> Fetch a single user
->PATCH  /users/:userId/edit  --> Edit user
->DELETE /users/:userId/del   --> Delete user

*/
