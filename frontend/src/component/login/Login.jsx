import { useEffect, useState } from "react";
import apiData from "../api /Apidata";
import { useNavigate } from "react-router-dom";
// import WebSocket from "../api /Websocket";
// import WebSocketComponent  from "../websocket/Websocket"
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
  const url = "http://127.0.0.1:8000";
  const loginHandel = async (e) => {
    e.preventDefault();
    const token = await apiData(`${url}/login`, {
      email: email,
      password: password,
    });
 
    handletoken(token);
  };
  function handletoken(params) {
    localStorage.setItem("token", params.access_token);
    navigation("/chat");
    setEmail("");
    setPassword("");
    // {<WebSocketComponent/>}
  }
  return (
    <div className="logincontainer">
      <h1 className="loginheading">Login </h1>
      <form className="loginform" onSubmit={() => loginHandel(event)}>
        <div className="insidelogin">
          <label className="loginlabel"> Username</label>
          <input
            className="logininput"
            type="text"
            placeholder="Enter user name "
            value={email}
            onChange={() => emailHandel(event)}
          />

          <label className="loginlabel">Password </label>
          <input
            className="logininput"
            type="password"
            placeholder="Enter your password"
            autoComplete="on"
            value={password}
            onChange={() => passwordHandel(event)}
          />
        </div>
        <button className="loginbtn" type="sumbit"> login</button>
        <p className="loginpara">
          Not a user ? <span onClick={() => navigation("/sigup")}>sigup</span>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
