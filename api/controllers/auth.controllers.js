require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const AuthControllers = {};

// POST /auth/signup --> Create a user
AuthControllers.createUser = (req, res, next) => {
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
              email: req.body.email,
              username: req.body.username,
              password: hash,
              notes: []
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

// POST /auth/login --> Login user
AuthControllers.loginUser = (req, res, next) => {
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

module.exports = AuthControllers;

/*

->POST    /auth/signup      ---done && tested
->POST    /auth/login       ---done && not tested
->POST    /auth/logout      ---not done && not tested

// AuthControllers routes
>>POST    /auth/signup      --> Create a user 
>>POST    /auth/login       --> Log user in
>>POST    /auth/logout      --> Log user out


*/