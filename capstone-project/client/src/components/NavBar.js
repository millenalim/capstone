import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {(() => {
          if (auth.currentUser && auth.currentUser.hasRole("ADMIN")) {
            return (
              <li>
              <Link to="/users">Users</Link>
              </li>
            )
          } else if (auth.currentUser) {
            return (
             <>
             <li>
               <Link to="/discover">Discover</Link>
             </li>
             <li>
               <Link to="/messages">Messages</Link>
             </li>
             <li>
               <Link to="/user-profile">Profile</Link>
             </li>
           </>
            )
          } else {
            return (
              <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
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
    </nav>
  );
}

export default NavBar;