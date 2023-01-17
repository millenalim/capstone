import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <nav class>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth.currentUser ? (
        <>
          <li>
            <Link to="/discover">Discover</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
        </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
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