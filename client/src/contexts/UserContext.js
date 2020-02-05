import React, { createContext, useState, memo, useMemo } from 'react';

export const UserContext = createContext();

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
  
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
  * fetchUserData checks the localStorage for user credentials
  * and updates both the global states of user and isLoggedIn
  * accordingly.
  *
  * @param {*} 
  * @returns
  *
  */
  const fetchUserData = (user, isLoggedIn) => {
    
    if (
      JSON.parse(
      window.localStorage.getItem('bearerToken')
     ) === null||
      window.localStorage.getItem('user')
        === ''
    ) {
      // Set user to the string 'guest
      setUser('guest');
      setIsLoggedIn(false);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('bearerToken');
    }
    else {
      // Retrieve from the localStorage
      setUser(window.localStorage.getItem('user'));
      setIsLoggedIn(true);
      console.log('Pulling user from localStorage..');
    }
  } // fetchUserData

  useMemo(fetchUserData, [user, isLoggedIn]);
  
  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}      
    </UserContext.Provider>
  )
} // SetUserContext

const UserProvider = memo(SetUserContext);

export default UserProvider;
