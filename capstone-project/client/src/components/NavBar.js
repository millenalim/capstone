import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const auth = useContext(AuthContext);

  const logoString = "<Hooked />";

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top">
      <div className="container-fluid">
        {/* <div className="collapse navbar-collapse justify-content-center"> */}
          <Link className="navbar-brand h1 fw-bold ms-5" to="/">{logoString}</Link>
          <ul className="navbar-nav mb-2 mb-md-1">
            {(() => {
              if (auth.currentUser && auth.currentUser.hasRole("ADMIN")) {
                return (
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
                );
              } else if (auth.currentUser) {
                return (
                  <>
                    <li className="nav-item me-5">
                      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item me-5">
                      <NavLink to="/discover" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
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
                      <NavLink to="/test_form" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Test Form
                      </NavLink>
                    </li>
                  </>
                );
              } else {
                return (
                  <>
                      {/* <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> */}
                    <Link to="/login" type="button" className="nav-item me-4 btn btn-outline-dark">
                      Login
                    </Link>
                      {/* </NavLink> */}
                    <Link to="/signup" type="button" className="nav-item me-5 btn btn-dark">
                      {/* <NavLink to="/signup" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> */}
                        Sign Up
                      {/* </NavLink> */}
                    </Link>
                  </>
                );
              }
            })()}
          </ul>
        {/* </div> */}
        {auth.currentUser && (
          <div className="me-5">
            <button  type="button" className="btn btn-outline-dark" onClick={() => auth.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
