import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';


function PrivateRoute({ children, ...rest }) {

  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) => 
        isLoggedIn ? (
          children
        ) : (
          <>
            {alert('You must log in to view that page!')}
            <Redirect 
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          </>
        )
      }
    />
  ) // return 
} // PrivateRoute

export default PrivateRoute;
