const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const UserControllers = {};

// POST /signup --> Create a user
UserControllers.createUser = (req, res, next) => {
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: `Email already taken! If it's yours, please
          login or reset your password if you forgot it.
          Otherwise signup with a new email address.`
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              username: req.body.username,
              password: hash
            });

            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created & saved successfully.'
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: err })
              })
          }
        }) // bcrypt.hash
      }
    }) // then
} // createUser

// POST /login --> Login user
UserControllers.loginUser = (req, res, next) => {
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Login failed!'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Login failed!' });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          res.status(200).json({
            message: 'Login successful.',
            bearerToken: token
          });
        }
        return res.status(401).json({
          message: 'Login failed!'
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
} // loginUser

// GET /users --> Fetch all users
UserControllers.fetchAllUsers = (req, res, next) => {
  User
    .find({})
    .select('username notes')
    .exec()
    .then(users => {
      res.status(200).json({ 
        count: users.length,
        users: users.map(user => {
          return {
            username: user.username,
            notes: user.notes
          }
        })
      })
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
    .select('username notes')
    .exec()
    .then(user => {
      res.status(200).json({ 
        username: user.username,
        notes: user.notes
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
} // fetchSingleUser

// PATCH /users/:userId/edit
UserControllers.editUser = (req, res, next) => {
  const userUpdates = {
    username: req.body.username,
    email: req.body.email
  };
  
  User
    .findOneAndUpdate(
      { _id: req.body.params.userId}, 
      userUpdates, 
      { new: true }
    )
    .select('username email')
    .exec()
    .then(user => {
      res.status(200).json({
        message: 'User updated successfully.',
        user
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
} // editUser

// DELETE /users/:userId/del --> Delete user
UserControllers.deleteUser = (req, res, next) => {
  User
    .remove({ username: req.params.username })
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

->POST    /signup              ---done && not tested
->POST    /login               ---done && not tested
->POST    /logout              ---not done && not tested
->GET     /users               ---done && not tested
->GET     /users/:userId       ---done && not tested
->PATCH   /users/:userId/edit  ---done && not tested
->DELETE  /users/:userId/del   ---done && not tested


// UserController routes

>>POST    /signup             --> Create a user 
>>POST    /login              --> Log user in
>>POST    /logout             --> Log user out
>>GET     /users              --> Fetch all users 
>>GET     /users/:userId      --> Fetch a single user
>>PATCH   /users/:userId/edit --> Edit user
>>DELETE  /users/:userId/del  --> Delete user

*/

