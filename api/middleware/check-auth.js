const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  try {
    // Access the token section of authorization headers
    const bearerToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.JWT_KEY);
    req.userData = decoded;
    next();
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
