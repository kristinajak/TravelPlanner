import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
import AuthContext from "../store/auth-context";

function MainNavigation() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    context.onLogout();
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {!context.isLoggedIn && (
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Register
              </NavLink>
            </li>
          )}
          {!context.isLoggedIn && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Log in
              </NavLink>
            </li>
          )}
          {context.isLoggedIn && (
            <li>
              <NavLink
                to="/checklist"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Checklist
              </NavLink>
            </li>
          )}
          {context.isLoggedIn && (
            <li>
              <NavLink
                to="/itinerary"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Itinerary
              </NavLink>
            </li>
          )}
          {context.isLoggedIn && (
            <li>
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Budget
              </NavLink>
            </li>
          )}
          {context.isLoggedIn && (
            <li className={classes.logoutButtonContainer}>
              <button className={classes.button} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
