// Modules
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Context
import { UserContext } from "../contexts/UserContext";

// Service
import AuthService from "../services/auth.service";

function Navbar({ history }) {
  const { isLoggedIn } = useContext(UserContext);

  function toggleMenu() {
    const navbarDiv = document.getElementById("navbarDiv");

    navbarDiv.classList.contains("invisible")
      ? navbarDiv.classList.remove("invisible")
      : navbarDiv.classList.add("invisible");
  } // setupNav

  // Small screen/device
  while (window.visualViewport.width <= 630) {
    return (
      <>
        <div id="navMenu" className="nav-menu" onClick={toggleMenu}>
          -- MENU --
        </div>

        <nav id="navbarDiv" className="invisible">
          {!isLoggedIn ? (
            <div className="navbar-links">
              <div>
                <Link className="links-in-navbar" to="/">
                  Home
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/samplelogin">
                  TestAccount
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/goodies">
                  Goodies
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/signin">
                  SignIn
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/signup">
                  SignUp
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-links">
              <div>
                <Link className="links-in-navbar" to="/">
                  Home
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/samplelogin">
                  TestAccount
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/goodies">
                  Goodies
                </Link>
              </div>
              <div>
                <Link
                  className="links-in-navbar"
                  to=""
                  onClick={AuthService.logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </nav>
      </>
    );
  }

  // Big screen/device
  while (window.visualViewport.width >= 630.01) {
    return (
      <>
        <nav id="navbarDiv">
          {!isLoggedIn ? (
            <div className="navbar-links">
              <div>
                <Link className="links-in-navbar" to="/">
                  Home
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/samplelogin">
                  TestAccount
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/goodies">
                  Goodies
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/signin">
                  SignIn
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/signup">
                  SignUp
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-links">
              <div>
                <Link className="links-in-navbar" to="/">
                  Home
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/samplelogin">
                  TestAccount
                </Link>
              </div>
              <div>
                <Link className="links-in-navbar" to="/goodies">
                  Goodies
                </Link>
              </div>
              <div>
                <Link
                  className="links-in-navbar"
                  to=""
                  onClick={AuthService.logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </nav>
      </>
    );
  }
} // Navbar

export default Navbar;
