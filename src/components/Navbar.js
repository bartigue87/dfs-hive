import React, { useState, useContext } from "react";
import hamburgerIcon from "../images/icon-hamburger.svg";
import closeIcon from "../images/icon-close.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../util/auth-context";
import "./Navbar.css";

export default function Navbar() {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  const admin = process.env.REACT_APP_ADMIN;

  function handleLogout() {
    auth.logout();
    navigate("/login", { replace: true });
  }

  const [isHidden, setIsHidden] = useState(true);

  function toggleNav() {
    setIsHidden((prevState) => !prevState);
  }

  const navStyle = {
    transform: isHidden ? "translateX(100%)" : "translateX(0%)",
  };

  const hamburgerStyle = {
    backgroundImage: isHidden ? `url(${hamburgerIcon})` : `url(${closeIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
  };
  return (
    <div className="nav-container">
      <h1>DFS Hive</h1>
      <nav className="active">
        <ul className="nav-list">
          <NavLink to="/">
            <li className="link">Home</li>
          </NavLink>
          <NavLink to={`/${auth.userId}/brm-tracker`}>
            <li className="link">Bankroll Manager</li>
          </NavLink>
          <NavLink to="/articles">
            <li className="link">Articles</li>
          </NavLink>
          <NavLink to="/brandons-plays">
            <li className="link">Brandon's Plays</li>
          </NavLink>
          {auth.userId === admin && (
            <NavLink to="/admin">
              <li className="link">Admin</li>
            </NavLink>
          )}
          <NavLink to="/login">
            {auth.isLoggedIn ? (
              <li className="link" onClick={handleLogout}>
                Logout
              </li>
            ) : (
              <li className="link">Login</li>
            )}
          </NavLink>
        </ul>
      </nav>
      <nav className="inactive" style={navStyle}>
        <ul className="nav-list">
          <NavLink to="/">
            <li className="link">Home</li>
          </NavLink>
          <NavLink to={`/${auth.userId}/brm-tracker`}>
            <li className="link">Bankroll Manager</li>
          </NavLink>
          <NavLink to="/articles">
            <li className="link">Articles</li>
          </NavLink>
          <NavLink to="/brandons-plays">
            <li className="link">Brandon's Plays</li>
          </NavLink>
          {auth.userId === admin && (
            <NavLink to="/admin">
              <li className="link">Admin</li>
            </NavLink>
          )}
          <NavLink to="/login">
            {auth.isLoggedIn ? (
              <li className="link" onClick={handleLogout}>
                Logout
              </li>
            ) : (
              <li className="link">Login</li>
            )}
          </NavLink>
        </ul>
      </nav>
      <button
        className="icon"
        style={hamburgerStyle}
        onClick={toggleNav}
      ></button>
    </div>
  );
}
