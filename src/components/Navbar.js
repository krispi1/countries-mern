// Modules
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import { UserContext } from '../contexts/UserContext';

// Service
import AuthService from '../services/auth.service';

function Navbar({ history }) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <nav>
      {
        isLoggedIn ? (
          <div className="navbar-links">
            <div><Link to="/">Home</Link></div>
            <div><Link to="" onClick={ AuthService.logout }>Logout</Link></div>
          </div>
        ) : (
          <div className="navbar-links">
            <div><Link to="/">Home</Link></div>
            <div><Link to="/samplelogin">TestAccount</Link></div>
            <div><Link to="/signin">SignIn</Link></div>
            <div><Link to="/signup">SignUp</Link></div>
          </div>
        )
      }
      
    </nav>
  )
}

export default Navbar;

