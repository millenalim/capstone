import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "./components/Login";
import MyChatComponent from "./components/MyChatComponent";
import NavBar from "./components/NavBar";
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
        <Route path="/login" element={
          currentUser ? <Navigate to={"/"} /> : <Login />
        }/>
        <Route path="/messages" element={<MyChatComponent/>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;