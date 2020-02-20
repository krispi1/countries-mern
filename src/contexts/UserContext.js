import React, { createContext, useState, memo, useMemo } from 'react';

export const UserContext  = createContext();


/**
 * SetUserContext creates a global user object 
 * (visible throughout the app) that keeps track of whether 
 * the current user is logged in, and if so, who they are.
 *
 * @param {*} { children }
 * @returns UserContext.Provider Higher Order Component
 */
function SetUserContext({ children }) {
  console.log('SetUserContext running...');
  
  const [userToken, setUserToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * fetchUserData is an impure function that checks the localStorage for 
   * user credentials and updates both the global states for user and 
   * isLoggedIn accordingly.
   *
   * @param {*} user
   * @param {*} isLoggedIn
   * @param {*} userToken
   */
  const fetchUserData = (user, isLoggedIn, userToken) => {
    if (
      JSON.parse(
      window.localStorage.getItem('bearerToken')
     ) === null ||
      window.localStorage.getItem('user')
        === ''
    ) {
      // If either the bearerToken or the user signifies that the user is
      // not logged in, remove them both from the localStorage and set their 
      // states to their default values.
      setUser('guest');
      setIsLoggedIn(false);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('bearerToken');
    }
    else {
      // Retrieve from the localStorage
      setUser(window.localStorage.getItem('user'));
      setUserToken(JSON.parse(window.localStorage.getItem('bearerToken')));
      setIsLoggedIn(true);
      console.log('Pulling user from localStorage..');
    }
  } // fetchUserData

  useMemo(fetchUserData, [user, isLoggedIn, userToken]);
  
  return (
    <UserContext.Provider value={{ user, isLoggedIn, userToken }}>
      {children}      
    </UserContext.Provider>
  )
} // SetUserContext

const UserProvider = memo(SetUserContext);

export default UserProvider;
