import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();

const response = await fetch("http://localhost:8080/create_account", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: email,
        password
    })
});
    if (response.status === 201) {
        navigate("/login");

    } else if (response.status === 400) {
        console.log("error sending...")

    } else {
        console.log("weird error")
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-email">Email:</label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            id="user-email"
          />
        </div>
        <div>
          <label htmlFor="user-password">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;