import axios from 'axios';
import jwt_decode from 'jwt-decode';

// AuthService is an object to hold all authentication services
const AuthService = {};

/**
 * AuthService.signup takes a newUser object, posts it to the
 * backend service.
 * 
 * @param {*} newUser
 * @returns {object} User object on success or custom signUpError 
 *    object on failure. 
 *
 */
AuthService.signup = newUser => {
  
  return axios
    .post(
      'auth/signup',
      {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
      }
    )
    .then(res => {
      console.log(res);
      window.location.href = '/signin';
      console.log('User registered successfully..');
    })
    .catch(err => {
      console.error(err);
      return { signUpError: err };
    })
} // signup


/**
 * AuthService.login takes a user object and makes a post 
 * request to the server with the user payload.
 * 
 * @param {*} user
 * @returns {(boolean | object)} Boolean for successful log in;
 *    or an error object upon login error.
 * 
 */ 
AuthService.login = user => {
  
  return axios
    // Send user data (POST) to the server at /auth/login endpoint
    .post(
      '/auth/login',
      {
        email: user.email,
        password: user.password
      }
    )
    .then(res => {
      if (res.data) {
        window.localStorage.setItem('bearerToken', JSON.stringify(res.data.bearerToken));
        const decoded = jwt_decode(res.data.bearerToken);
        window.localStorage.setItem('user', decoded.username);
        window.location.href = '/';// Redirect the user
        
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return { loginError: err };
    })
} // login


/**
 * AuthService.logout discards user credentials from the local
 * storage thereby effectively triggering the UserContext
 * to update accordingly.
 *
 * @param {}
 * @returns {}
 * 
 */
AuthService.logout = () => {
  window.localStorage.removeItem("bearerToken");
  window.localStorage.removeItem("user");
  window.location.href = '/';
} // logout

export default AuthService;


