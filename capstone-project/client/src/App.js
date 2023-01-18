import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import TableOfUsers from "./components/TableOfUsers";
import MyChatComponent from "./components/MyChatComponent";
import AuthContext from "./context/AuthContext";


const LOCAL_STORAGE_TOKEN_KEY = "hookedToken";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token) {
      login(token);
    }
  }, []);

    const login = (token) => {
      const { sub: username, authorities: authoritiesString } = jwtDecode(token);

      const roles = authoritiesString.split(',');

      const user = {
        username,
        roles,
        token,
        hasRole(role) {
          return this.roles.includes(role);
        }
      };

      console.log(user);

      setCurrentUser(user);

      return user;
    }

    const logout = () => {
      setCurrentUser(null);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }

  const auth = {
    currentUser: currentUser ? {...currentUser} : null,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <NavBar />

        <Routes>
        {/* If logged in as user, go to home page, if not, go to login page */}
        <Route path="/login" element={
          currentUser ? <Navigate to={"/"} /> : <Login />
        }/>

        {/* If user is logged in and clicks message in navbar, go to chatbox */}
        <Route path="/messages" element={
          currentUser ? <MyChatComponent/> : <Login />
        } />
        
        {/* If logged in as admin, go to the table of users, if not, go to login page */}
        <Route path="/users" element={
          currentUser ? <TableOfUsers /> : <Login /> 
        }/>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;