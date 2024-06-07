import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, logout } from "./services/auth_service";

const Header = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles && user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles && user.roles.includes("ROLE_ADMIN"));
    }
  }, [location]);

  const logOut = () => {
    logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-around">
      <Link to={"/"} className="navbar-brand" style={{ fontSize: "1.5rem" }}>
        ResQ Tails
      </Link>
      <div className="navbar-nav mr-auto">
        {currentUser && (
          <li className="nav-item">
            <Link to={"/home"} className="nav-link" style={{ fontSize: "1.2rem" }}>
              Blog
            </Link>
          </li>
        )}

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link" style={{ fontSize: "1.2rem" }}>
              Moderator Board
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link" style={{ fontSize: "1.2rem" }}>
              Admin Board
            </Link>
          </li>
        )}
      </div>
      <div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <div>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link" style={{ fontSize: "1.2rem" }}>
                  {currentUser.username}
                </Link>
              </li>
            </div>
            <div>
              <li className="nav-item">
                <a href="/login" className="nav-link" style={{ fontSize: "1.2rem" }} onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" style={{ fontSize: "1.2rem" }}>
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link" style={{ fontSize: "1.2rem" }}>
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
