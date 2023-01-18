import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

    const response = await fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: email,
            password
        })
    });
        if (response.status === 200) {
            const { jwt_token } = await response.json();
            auth.login(jwt_token)
            navigate("/");

        } else if (response.status === 403) {
            console.log("error sending...")

        } else {
            console.log("weird error")
        }
    };

  return (
    <div>
        <h2 className="text-white">Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="text-white" htmlFor="user-email">Email:</label>
                <input 
                    type="text"
                    onChange={(event) => setEmail(event.target.value)}
                    id="user-email"
                />
            </div>
            <div>
                <label className="text-white" htmlFor="user-password">Password:</label>
                <input 
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
  );
}

export default Login;