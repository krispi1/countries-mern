import React from 'react';
import { Link } from 'react-router-dom';


function Navbar({ history }) {
  return (
    <nav>
      <div className="navbar-links">
        <div><Link to="/">Home</Link></div>
        <div><Link to="/signin">SingIn</Link></div>
        <div><Link to="/signup">SingUp</Link></div>
        <div><Link to="/countries">Countries</Link></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar;

