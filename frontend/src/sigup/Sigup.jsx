import React, { useEffect, useState } from "react";
import apiData from "../api /Apidata";
import "./sigup.css";
import { useNavigate } from "react-router-dom";

function Sigup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpass, setConformpass] = useState("");
  const url = "http://127.0.0.1:8000/register";
  const navigation = useNavigate();
  const userNameHamdel = (e) => {
    let username = e.target.value;
    setUsername(username);
  };
  const emailHandel = (e) => {
    let email = e.target.value;
    setEmail(email);
  };
  const passwordHandel = (e) => {
    let password = e.target.value;
    setPassword(password);
  };
  const conformPasswordHandel = (e) => {
    let conform = e.target.value;
    setConformpass(conform);
  };
  const sigInbtn = async (e) => {
    e.preventDefault();
    if (password === conformpass && password.length > 8) {
      await apiData(
        url,
        {
          username: username,
          email: email,
          password: password,
        },
        ""
      );
      setUsername("");
      setConformpass("");
      setEmail("");
      setPassword("");
      navigation("/");
    } else {
      alert("please enter corret detalis");
    }
  };
  return (
    <div className="sigupcontainer">
      <h1>Register</h1>
      <form>
        <div>
          <label>User name </label>
          <input
            type="text"
            placeholder="Enter your name "
            value={username}
            onChange={() => userNameHamdel(event)}
          />
          <label>E-mail </label>
          <input
            type="email"
            placeholder="Enter your email "
            value={email}
            onChange={() => emailHandel(event)}
          />
          <label> Create password </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={() => passwordHandel(event)}
            autoComplete="on"
          />

          <label>Conform password </label>
          <input
            type="password"
            placeholder="Conform password"
            value={conformpass}
            onChange={() => conformPasswordHandel(event)}
            autoComplete="on"
          />
        </div>
        <button onClick={() => sigInbtn(event)}>sigup</button>
        <p>
          {" "}
          Already a user ? <span onClick={() => navigation("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Sigup;
