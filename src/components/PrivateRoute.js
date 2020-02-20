import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import { UserContext } from '../contexts/UserContext';


function PrivateRoute({ children, ...rest }) {

  const { user, isLoggedIn, userToken } = useContext(UserContext);
  console.log(`isLoggedIn? ${isLoggedIn}`);
  console.log('userToken? ', (userToken ? userToken : 'No--token'));
  
  return (
    <Route
      {...rest}
      render={({ location }) => 
        (
          userToken === 
          JSON.parse(window.localStorage.getItem('bearerToken')) &&
          user === window.localStorage.getItem('user')
        ) ? (
          children
        ) : (
          <>
            {alert('Please log in to view this page!')}
            {window.localStorage.removeItem("bearerToken")}
            {window.localStorage.removeItem("user")}
            <Redirect 
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          </>
        )
      } // render
    />
  ) // return 
} // PrivateRoute

export default PrivateRoute;
