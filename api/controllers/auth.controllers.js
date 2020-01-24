require('mongoose'); // Ensure mongoose is in scope

const bcrypt = require('bcrypt'); // For encrypting password
const jwt = require('jsonwebtoken'); // For signing token

const User = require('../models/user.model');

// Abstract away all auth controller functions 
// with a single object: AuthControllers
// Enable "dependency injection" wherever needed
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
                return res.status(201).json({
                  message: 'User created & saved successfully.',
                  login_here: 'http://localhost:4001/auth/login',
                });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({ error: err })
              })
          }
        }) // bcrypt.hash
      }
    }) // then
} // createUser

// POST /auth/login --> Login user
AuthControllers.loginUser = (req, res, next) => {
  console.log('--------logs--------\n1. Request to /login initiated..');
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
      console.log('2. Inside then block: User not found..');
        res.status(401).json({
          message: 'Login failed!',
          try_again: 'http://localhost:4001/auth/login',
          sign_up: 'http://localhost:4001/auth/signup',
          go_home: 'http://localhost:4001'
        });
        return;
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        console.log('3. In bcrypt.compare block: Checking password..');
        if (err) {
          console.log('4. In bcrypt.compare (err) block: Password check error..');
          res.status(401).json({ 
            message: 'Login failed!',
            try_again: 'http://localhost:4001/auth/login',
            go_home: 'http://localhost:4001'
          });
          return;
        }
        if (result) {
          console.log('5. In bcrypt.compare (result) block: Password check passed..');
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
          console.log('6. In bcrypt.compare (result) block: Token generated..');
          console.log('7. In bcrypt.compare (result) block: Login successful..');
          res.status(200).json({
            message: 'Login successful.',
            bearerToken: token
          });
          return;
        }
        console.log('8. In bcrypt.compare block: Default error block reached...');
        console.log('9. In bcrypt.compare (err) block: Password check failed..');
        res.status(401).json({
          message: 'Login failed!',
          try_again: 'http://localhost:4001/auth/login',
          go_home: 'http://localhost:4001'
        });
        return;
      })
    })
    .catch(err => {
      console.log('10. Default /auth error block reached...');
      console.log(err);
      res.status(500).json({ 
        error: err,
        message: 'Login failed!',
        try_again: 'http://localhost:4001/auth/login',
        sign_up: 'http://localhost:4001/auth/signup',
        go_home: 'http://localhost:4001'
      });
      return;
    })
} // loginUser

module.exports = AuthControllers;


/*

->POST    /auth/signup      ---done && tested
->POST    /auth/login       ---done && tested
->POST    /auth/logout      ---not done && not tested

// AuthControllers routes
>>POST    /auth/signup      --> Create a user 
>>POST    /auth/login       --> Log user in
>>POST    /auth/logout      --> Log user out

*/