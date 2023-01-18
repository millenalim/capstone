import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <div className="container-fluid">
        <ul>
          <li>
            <NavLink 
                to="/"
                className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
                }
            >Home</NavLink>
          </li>
          {(() => {
            if (auth.currentUser && auth.currentUser.hasRole("ADMIN")) {
              return (
                <li>
                <NavLink 
                  to="/users"
                  className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                  }
                >Users</NavLink>
                </li>
              )
            } else if (auth.currentUser) {
              return (
              <>
              <li>
                <NavLink 
                  to="/discover"
                  className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                  }
                >Discover</NavLink>
              </li>
              <li>
                <NavLink
                  to="/messages"
                  className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                  }
                >Messages</NavLink>
              </li>
              <li>
                <NavLink 
                  to="/user-profile"
                  className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                  }
                >Profile</NavLink>
              </li>
            </>
              )
            } else {
              return (
                <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                  }
                >Login</NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                  }
                >Sign Up</NavLink>
              </li>
            </>
              )
            }
          })()}
        </ul>
        {auth.currentUser && (
          <div>
            <button onClick={() => auth.logout()}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;