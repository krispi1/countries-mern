require('mongoose');

const User = require('../models/user.model');

const UserControllers = {};

// GET /users --> Fetch all users
UserControllers.fetchAllUsers = (req, res, next) => {
  User
    .find()
    .select('_id email username notes')
    .exec()
    .then(users => {
      console.log(users);
      const response = {
        count: users.length,
        users: users.map(user => {
          return {
            _id: user._id,
            email: user.email,
            username: user.username,
            notes: user.notes
          }
        })
      };

      res.status(200).json({ ...response })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
} // fetchAllUsers

// GET /users/:userId --> Fetch a single user
UserControllers.fetchSingleUser = (req, res, next) => {
  User
    .find({ _id: req.params.userId })
    .select('username email notes')
    .exec()
    .then(user => {
      console.log(user);
      res.status(200).json( user[0] )
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
} // fetchSingleUser

// PATCH /users/:userId/edit
UserControllers.editUser = (req, res, next) => {
  User
    .findById(req.params.userId)
    .select('username email')
    .exec()
    .then(user => {
      user.username = req.body.username ?
        req.body.username : user.username;
      user.email = req.body.email ?
        req.body.email : user.email;

      user
        .save()
        .then(updatedUser => {
          res.json({
            message: 'User updated',
            updatedUser
          });
        })
        .catch(err => res.status(400).json({ error: err }))
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
} // editUser

// DELETE /users/:userId --> Delete user
UserControllers.deleteUser = (req, res, next) => {
  User
    .remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted!!'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
} // deleteUser

module.exports = UserControllers;

/* 

->GET     /users               ---done && tested
->GET     /users/:userId       ---done && tested
->PATCH   /users/:userId/edit  ---done && tested
->DELETE  /users/:userId/del   ---done && tested

// UserController routes
>>GET     /users              --> Fetch all users 
>>GET     /users/:userId      --> Fetch a single user
>>PATCH   /users/:userId/edit --> Edit user
>>DELETE  /users/:userId/del  --> Delete user

*/

