import React, { useState } from "react";
import apiData from "../api /Apidata";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();
  const emailHandel = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandel = (e) => {
    setPassword(e.target.value);
  };
  const url = "http://127.0.0.1:8000/login";
  const loginHandel = async (e) => {
    e.preventDefault();
    const token = await apiData(url, {
      // sand data to api
      email: email,
      password: password,
    });
    if (token) {
      handletoken(token);
    }
  };
  // if the  api data is present then run
  function handletoken(params) {
    localStorage.setItem("token", params.access_token); //  sand data to local storage
    navigation("/chat"); // navigate to logout page
    setEmail("");
    setPassword("");
  }
  return (
    <div className="logincontainer">
      <h1>Login </h1>
      <form onSubmit={() => loginHandel(event)}>
        <div>
          <label> Username</label>
          <input
            type="text"
            placeholder="Enter user name "
            value={email}
            onChange={() => emailHandel(event)}
          />

          <label>Password </label>
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="on"
            value={password}
            onChange={() => passwordHandel(event)}
          />
        </div>
        <button type="sumbit"> login</button>
        <p>
          Not a user ? <span onClick={() => navigation("/sigup")}>sigup</span>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
