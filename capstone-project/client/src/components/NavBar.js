import { useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar({ currentUser }) {
  const { appUserId } = useParams();
  const auth = useContext(AuthContext);

  const logoString = "<Hooked />";

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top">
      <div className="container-fluid">
          <Link className="navbar-brand h1 fw-bold ms-5" to="/">{logoString}</Link>
          <ul className="navbar-nav mb-2 mb-md-1">
              {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? 
                (
                  <>
                    <li className="nav-item">
                      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Users
                      </NavLink>
                    </li>
                  </>
                ) : null}
              {auth.currentUser && auth.currentUser.hasRole("USER") ? 
                (
                  <>
                    <li className="nav-item me-5">
                      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item me-5">
                      <NavLink to= {`/discover/${currentUser.appUserId}`} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Discover
                      </NavLink>
                    </li>
                    <li className="nav-item me-5">
                      <NavLink to="/messages" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Messages
                      </NavLink>
                    </li>
                    <li className="nav-item me-5">
                      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item me-5">
                      <NavLink to="/profile_form" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Test Form
                      </NavLink>
                    </li>
                  </>
                ) : null}
              {!auth.currentUser ? 
                (
                  <>
                    <Link to="/login" type="button" className="nav-item me-4 btn btn-outline-dark">
                      Login
                    </Link>
                    <Link to="/signup" type="button" className="nav-item me-5 btn btn-dark">
                        Sign Up
                    </Link>
                  </>
                ) : null}
        </ul>
        {auth.currentUser ? (
          <div className="me-5">
            <Link to="/login" type="button" className="btn btn-outline-dark" onClick={() => auth.logout()}>Logout</Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default NavBar;
