import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const loginHandel = (e) => {
    e.preventDefault();
    apiData({
      // sand data to api
      email: email,
      password: password,
    });
  };
  // if the  api data is present then run
  function handletoken(params) {
    localStorage.setItem("token", params.access_token); //  sand data to local storage
    navigation("/logout"); // navigate to logout page
    setEmail("");
    setPassword("");
  }

  async function apiData(data) {
    await axios
      .post("http://127.0.0.1:8000/login", data)
      .then((response) => response.data && handletoken(response.data))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <form onSubmit={() => loginHandel(event)}>
        <label> Username</label>
        <input
          type="text"
          placeholder="enter user name "
          value={email}
          onChange={() => emailHandel(event)}
        />
        <label>Password </label>
        <input
          type="password"
          autoComplete="on"
          value={password}
          onChange={() => passwordHandel(event)}
        />
        <button type="sumbit"> login</button>
      </form>
    </div>
  );
}

export default Login;
