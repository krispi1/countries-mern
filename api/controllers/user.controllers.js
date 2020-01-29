require('mongoose'); // Ensure mongoose is in scope

const User = require('../models/user.model'); // User model

// Abstract away all user controller functions 
// with a single object, UserControllers.
// This enables "dependency injection" wherever needed.
const UserControllers = {};

// GET /users --> Fetch all users
UserControllers.fetchAllUsers = (req, res, next) => {
  console.log('\nfetchAllUsers invoked...');
  
  User
    .find()
    .select('_id username')
    .exec()
    .then(users => {
      const response = {
        count: users.length,
        users: users.map(user => {
          return {
            _id: user._id,
            username: user.username,
            notes: user.notes,
            view_user: `http://localhost:4001/users/${user.username}`,
            user_notes: `http://localhost:4001/notes/${user.username}`
          }
        })
      };
      return res.status(200).json({ 
        ...response, 
        all_notes: `http://localhost:4001/notes`,
      });
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    })
} // fetchAllUsers

// GET /users/:username --> Fetch a single user
UserControllers.fetchSingleUser = (req, res, next) => {
  console.log('\nfetchSingleUser invoked...');

  User
    .find({ username: req.params.username })
    .select('_id username notes')
    .exec()
    .then(user => {
      return user[0] === undefined ? (
        // The username supplied is invalid or user not found
        res.status(500).json({
          message: 'Invalid user!!',
          go_home: 'http://localhost:4001',
          all_users: 'http://localhost:4001/users',
          all_notes: 'http://localhost:4001/notes'
        })
      ) : (
        // Successful user retrieval response
        res.status(200).json({ 
          _id: user[0]._id,
          username: user[0].username,
          more_links: {
            user_notes: `http://localhost:4001/notes/${user[0].username}`,
            all_notes: `http://localhost:4001/notes`,
            all_users: `http://localhost:4001/users`
          }
        })
      )
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    })
} // fetchSingleUser

// PATCH /users/:username/edit --> Edit user
UserControllers.editUser = (req, res, next) => {
  console.log('\neditUser invoked...');

  User
    .find({ username: req.body.username })
    .select('username email')
    .exec()
    .then(user => {
      // Prevent overwriting what we already have in the database
      // with a null value just in case no value is provided
      // for any given field (fields left blank upon submission)
      user.username = req.body.username ?
        req.body.username : user.username;

      user.email = req.body.email ?
        req.body.email : user.email;

      user
        .save()
        .then(updatedUser => {
          return res.json({
            message: 'User updated',
            updatedUser
          });
        })
        .catch(err => res.status(400).json({ error: err }))
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    })
} // editUser

// DELETE /users/:username/del --> Delete user
UserControllers.deleteUser = (req, res, next) => {
  console.log('\ndeleteUser invoked...');

  User
    .deleteOne({ username: req.params.username })
    .exec()
    .then(result => {
      return res.status(200).json({
        message: 'User deleted!!',
        go_home: 'http://localhost:4001',
        all_users: 'http://localhost:4001/users',
        all_notes: 'http://localhost:4001/notes'
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err,
        go_home: 'http://localhost:4001', 
        all_users: 'http://localhost:4001/users',
        all_notes: 'http://localhost:4001/notes'
      })
    })
} // deleteUser

module.exports = UserControllers;


/* 

->GET     /users                 ---done && tested
->GET     /users/:username       ---done && tested
->PATCH   /users/:username/edit  ---done && tested
->DELETE  /users/:username/del   ---done && tested

// UserController routes & handler functions 

Method   Route                   Function           Purpose

GET      /users                  fetchAllUsers      Fetch all users 
GET      /users/:username        fetchSingleUser    Fetch a single user
PATCH    /users/:username/edit   editUser           Edit user
DELETE   /users/:username/del    deleteUser         Delete user


// console.log(UserControllers)
// {
//   fetchAllUsers: [Function],
//   fetchSingleUser: [Function],
//   editUser: [Function],
//   deleteUser: [Function]
// }

*/
