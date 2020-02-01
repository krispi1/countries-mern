import React, { createContext, useState, memo, useMemo } from 'react';

export const UserContext = createContext();

function SetUserContext({ children }) {
  console.log('SetUserContext rendering...');
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    if (JSON.parse(window.localStorage.getItem('bearerToken')) === null) {
      
      // Set user to the string 'guest
      setUser('guest');
    }
    else {
      // Retrieve from the localStorage
      setUser(window.localStorage.getItem('user'));
      console.log('Pulling from localStorage..');
    }
  } // fetchUserData

  useMemo(fetchUserData, []);
  
  return (
    <UserContext.Provider value={{ user }}>
      {children}      
    </UserContext.Provider>
  )
} // SetUserContext

const UserProvider = memo(SetUserContext);

export default UserProvider;

