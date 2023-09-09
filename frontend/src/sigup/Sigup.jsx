import React, { useEffect, useState } from "react";
import axios from "axios";

function Sigup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpass, setConformpass] = useState("");
  const [response, setResponse] = useState([]);

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
  const sigInbtn = (e) => {
    e.preventDefault();
    if (password === conformpass && password.length > 8) {
      setResponse([
        {
          username: username,
          email: email,
          password: password,
        },
      ]);
      apiData({
        username: username,
        email: email,
        password: password,
      });
      setUsername("");
      setConformpass("");
      setEmail("");
      setPassword("");
    } else {
      alert("please enter corret detalis");
    }
  };
  async function apiData(data) {
    await axios
      .post("http://127.0.0.1:8000/register",  data )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form>
        <label>User-name</label>
        <input
          type="text"
          placeholder="enter your name "
          value={username}
          onChange={() => userNameHamdel(event)}
        />
        <label>E-mail </label>
        <input
          type="email"
          placeholder="enter your email "
          value={email}
          onChange={() => emailHandel(event)}
        />
        <label> Create-password</label>
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={() => passwordHandel(event)}
          autoComplete="on"
        />
        <label>Conform-password</label>
        <input
          type="password"
          placeholder="conform password"
          value={conformpass}
          onChange={() => conformPasswordHandel(event)}
          autoComplete="on"
        />
        <button onClick={() => sigInbtn(event)}>sigup</button>
      </form>
    </div>
  );
}

export default Sigup;
