require('mongoose'); // Ensure mongoose is in scope

const bcrypt = require('bcrypt'); // For encrypting password
const jwt = require('jsonwebtoken'); // For signing token

const User = require('../models/user.model'); // User model

// Abstract away all auth controller functions 
// with a single object, AuthControllers.
// This enables "dependency injection" wherever needed.
const AuthControllers = {};

// POST /auth/signup --> Create a user
AuthControllers.createUser = (req, res, next) => {
  console.log('\ncreateUser invoked...');
  
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: `Email already taken! If it's yours, please
          login or reset your password if you forgot it.
          Otherwise signup with a new email address.`,
          login_here: 'http://localhost:4001/auth/login',
          all_notes: `http://localhost:4001/notes`,
          all_users: `http://localhost:4001/users`
        })
      } else {
        // Hash password with 10 salting rounds
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              email: req.body.email,
              username: req.body.username,
              password: hash,
            });

            user
              .save()
              .then(result => {
                return res.status(201).json({
                  message: 'User created & saved successfully.',
                  login_here: 'http://localhost:4001/auth/login',
                  all_notes: `http://localhost:4001/notes`,
                  all_users: `http://localhost:4001/users`
                });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({ error: err })
              })
          } // else
        }) // bcrypt.hash
      } // else
    }) // then
} // createUser

// POST /auth/login --> Log user in
AuthControllers.loginUser = (req, res, next) => {
  console.log('\nloginUser invoked...');
  
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Login failed! Check your password or email.',
          try_again: 'http://localhost:4001/auth/login',
          sign_up: 'http://localhost:4001/auth/signup',
          go_home: 'http://localhost:4001',
          all_notes: `http://localhost:4001/notes`,
          all_users: `http://localhost:4001/users`
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ 
            message: 'Login failed! Check your password or email.',
            try_again: 'http://localhost:4001/auth/login',
            go_home: 'http://localhost:4001',
            all_notes: `http://localhost:4001/notes`,
            all_users: `http://localhost:4001/users`
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              username: user[0].username,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: 'Login successful.',
            bearerToken: token,
            more_links: {
              my_notes: `http://localhost:4001/notes/${user[0].username}`,
              all_notes: `http://localhost:4001/notes`,
              my_page: `http://localhost:4001/users/${user[0].username}`,
              all_users: `http://localhost:4001/users`,
              go_home: 'http://localhost:4001'
            }
          });
        }
        return res.status(401).json({
          message: 'Login failed! Check your password or email.',
          try_again: 'http://localhost:4001/auth/login',
          go_home: 'http://localhost:4001',
          all_notes: `http://localhost:4001/notes`,
          all_users: `http://localhost:4001/users`
        });
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ 
        error: err,
        message: 'Login failed! Check your password or email.',
        try_again: 'http://localhost:4001/auth/login',
        sign_up: 'http://localhost:4001/auth/signup',
        go_home: 'http://localhost:4001',
        all_notes: `http://localhost:4001/notes`,
        all_users: `http://localhost:4001/users`
      });
    })
} // loginUser


// POST /auth/logout --> Log user out --> Login required
AuthControllers.logoutUser = (req, res, next) => {} // logoutUser

module.exports = AuthControllers;


/*

->POST    /auth/signup      ---done && tested
->POST    /auth/login       ---done && tested
->POST    /auth/logout      ---not done && not tested

// AuthControllers routes & handler functions

Method  Route          Function       Purpose

POST    /auth/signup   createUser     Create a user 
POST    /auth/login    loginUser      Log user in
POST    /auth/logout   logoutUser     Log user out

*/




/* 
// loginUser with console.log statements for troubleshooting

// POST /auth/login --> Log user in
AuthControllers.loginUser = (req, res, next) => {
  console.log('--------logs--------\n1. Request to /login initiated..');
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
      console.log('2. Inside then block: User not found..');
        res.status(401).json({
          message: 'Login failed! Check your password or email.',
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
            message: 'Login failed! Check your password or email.',
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
              expiresIn: "6h"
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
          message: 'Login failed! Check your password or email.',
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
        message: 'Login failed! Check your password or email.',
        try_again: 'http://localhost:4001/auth/login',
        sign_up: 'http://localhost:4001/auth/signup',
        go_home: 'http://localhost:4001'
      });
      return;
    })
} // loginUser
*/
