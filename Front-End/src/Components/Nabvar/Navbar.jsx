import React from "react";
import { Link, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  const handleAboutClick = () => {
    scroll.scrollToBottom();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="logo-name">The Grocery</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
           <Link to="/offers">
            Offers
          </Link>
          <Link to="#" onClick={handleAboutClick}>
            About us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
