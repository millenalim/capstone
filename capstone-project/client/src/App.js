import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import MessageFactory from "./components/MessageFactory";
import NotFound from "./components/NotFound";
import TableOfUsers from "./components/TableOfUsers";
import MyChatComponent from "./components/MyChatComponent";
import ProfileForm from "./components/ProfileForm";
import Login from "./components/Login";
import Register from "./components/Register";
import UsersSingleCard from "./components/user/UsersSingleCard";
import AuthContext from "./context/AuthContext";


const LOCAL_STORAGE_TOKEN_KEY = "hookedToken";

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setAllUsers] = useState([]);
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

  const isPasswordComplex = (password) => {
    let digits = 0;
    let letters = 0;
    let others = 0;

    const characters = [...password];
  
    for (let c of characters) {
      const charCode = c.charCodeAt(0);

      if (charCode >= 48 && charCode <= 57) { // numbers 0-9
        digits++;
      } else if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) { // lowercase and uppercase letters
        letters++;
      } else {
        others++;
      }
    }

    return digits > 0 && letters > 0 && others > 0;
  }

  const makeId = () => {
    let id = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( var i = 0; i < 12; i++ ) {
      id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return id;
  }

  const parseResponseMessage = (response, agentData = "", method = "changed") => {
    switch (response.status) {
      case 200: 
        return response.json();

      case 201: 
        return response.json();

      case 204:
        setMessages([...messages, { id: makeId(), type: "success", text: `Agent ${agentData.firstName} ${agentData.lastName} was successfully ${method}.`}]);
        return null;
      
      case 404:
        setMessages([...messages, { id: makeId(), type: "failure", text: "Agents could not be found."}]);
        return null;
      
      case 409:
        setMessages([...messages, { id: makeId(), type: "failure", text: "Agent data does not match. Request could not be completed."}]);
        return null;

      default:
        setMessages([...messages, { id: makeId(), type: "failure", text: "Something went wrong. Please try again later."}]);
        return null;
    }
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <NavBar />
        <div className="container pt-5 mt-5">
          <MessageFactory messages={messages} setMessages={setMessages} />
            <Routes>
              <Route path="/" element={<Home />} />
            {/* If logged in as user, go to home page, if not, go to login page */}
            <Route path="/login" element={
              currentUser ? <Navigate to={"/"} /> : 
              <Login 
                messages={messages}
                setMessages={setMessages}
                makeId={makeId}
                isPasswordComplex={isPasswordComplex}
                />
            }/>

            <Route path="/signup" element={
              currentUser ? <Navigate to="/" /> : 
              <Register
                messages={messages}
                setMessages={setMessages}
                makeId={makeId}
                isPasswordComplex={isPasswordComplex}
              />
            }/>

            <Route path="/create_profile" element={
              <ProfileForm 
              messages={messages}
              setMessages={setMessages}
              makeId={makeId}
              parseResponseMessage={parseResponseMessage}
              />
            }/>

            <Route path="/discover"/>

            {/* If user is logged in and clicks message in navbar, go to chatbox */}
            <Route path="/messages" element={
              currentUser ? <MyChatComponent/> : <NotFound />
            } />

            <Route path="/profile" element={
              currentUser ? <UsersSingleCard currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <NotFound />
            }/>
            
            {/* If logged in as admin, go to the table of users, if not, go to login page */}
            <Route path="/users" element={
              currentUser ? <TableOfUsers users={users} setAllUsers={setAllUsers} /> : <Login /> 
            }/>

            <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;