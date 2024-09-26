import React, { useEffect, useState } from "react";
import apiData from "../api /Apidata";
import Getapi from "../api /Getapi";
import "./sigup.css";
import { useNavigate } from "react-router-dom";

function Sigup() {
  const [username, setUsername] = useState("");
  const [usererr, setUsererr] = useState("*");
  const [email, setEmail] = useState("");
  const [emailerr, setEmailerr] = useState("*");
  const [password, setPassword] = useState("");
  const [conformpass, setConformpass] = useState("");
  const [passworderr, setPassworderr] = useState("*");
  const url = "http://127.0.0.1:8000";
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
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat) && email != "") {
      if (username != "") {
        if (password === conformpass && password != "") {
          const response = await apiData(`${url}/register`, {
            username: username,
            email: email,
            password: password,
          });
          if (response?.massage == "user Created successfully") {
            setUsername("");
            setConformpass("");
            setEmail("");
            setPassword("");
            navigation("/");
          } else {
            alert("user is alerady exist");
          }
        } else {
          setPassworderr("password not match");
        }
      } else {
        setUsererr("please enter username");
      }
    } else {
      setEmailerr("please enter vaild email");
    }
  };

  return (
    <div className="sigupcontainer">
      <h1 className="sigupheading">Register</h1>
      <form className="sigupform">
        <div className="insidesigup">
          <label className="signuplabel">
            User name <span className="error">{usererr}</span>
          </label>
          <input
            className="sigupinput"
            type="text"
            placeholder="Enter your name "
            value={username}
            onChange={() => userNameHamdel(event)}
          />
          <label className="signuplabel">
            E-mail <span className="error">{emailerr}</span>{" "}
          </label>
          <input
            className="sigupinput"
            type="email"
            placeholder="Enter your email "
            value={email}
            onChange={() => emailHandel(event)}
          />
          <label className="signuplabel">
            {" "}
            Create password <span className="error">{passworderr}</span>
          </label>
          <input
            className="sigupinput"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={() => passwordHandel(event)}
            autoComplete="on"
          />

          <label className="signuplabel">
            Conform password <span className="error">{passworderr}</span>
          </label>
          <input
            className="sigupinput"
            type="password"
            placeholder="Conform password"
            value={conformpass}
            onChange={() => conformPasswordHandel(event)}
            autoComplete="on"
          />
        </div>
        <button className="sigupbtn" onClick={() => sigInbtn(event)}>sigup</button>
        <p className="siguppara">
          {" "}
          Already a user ? <span onClick={() => navigation("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Sigup;
