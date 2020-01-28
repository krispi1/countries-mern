const jwt = require('jsonwebtoken');

// Validate login credentials
// Returns a boolean
const isLoggedIn = (req, res, next) => {
  try {
    // Auth headers pattern --> Authorization: bearerToken token
    // Grab token from the second part of Authorization headers
    const bearerToken = req.headers.authorization.split(" ")[1];
    
    // Decode the encoded bearerToken which is supplied along with 
    // user request and assign the result to the userData
    // property of the request (req) object
    req.userData = jwt.verify(bearerToken, process.env.JWT_KEY);
    
    next(); // Call the next middleware in line

  } catch(err) {
    console.error(err);
    return res.status(401).json({
      message: 'You must be logged in for this!',
      log_in: 'http://localhost:4001/auth/login',
      sign_up: 'http://localhost:4001/auth/signup',
      go_home: 'http://localhost:4001'
    });
  }
} // isLoggedIn

module.exports = isLoggedIn;
