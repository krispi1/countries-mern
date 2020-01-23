const router   = require('express').Router();

// const isLoggedIn = require('../middleware/check-auth');

// UC --> UserControllers
const UC = require('../controllers/user.controllers');

// GET --> Fetch all users
router.get('/', UC.fetchAllUsers);

// GET --> Fetch a single user
router.get('/:userId', UC.fetchSingleUser);

// PATCH --> Edit user
router.patch('/:userId/edit', UC.editUser);

// DELETE --> Delete user
router.delete('/:userId/del', UC.deleteUser);

module.exports = router;

// GET    /users              --> Fetch all users
// GET    /users/:userId      --> Fetch a single user
// DELETE /users/:userId/del  --> Delete user
