import React, { useState } from "react";
import apiData from "../api /Apidata";
import "./changepassword.css"

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const url = "http://127.0.0.1:8000/changePassword";
  const data = localStorage.getItem("token");
  const changeHandel = async (e) => {
    e.preventDefault();
    await apiData(url, {
      email: email,
      old_password: password,
      new_password: newpassword,
    });
    setEmail("");
    setNewPassword("");
    setPassword("");
  };
  const newPasswordHandel = (e) => {
    setNewPassword(e.target.value);
  };
  const emailHandel = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandel = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="changepasswordcontainer">
      <h1>Change password</h1>
      <form onSubmit={() => changeHandel(event)}>
        <div>
        <label>E-mail</label>
        <input type="email"
          placeholder="Enter your register email"
          value={email} onChange={() => emailHandel(event)} />
        <label> Old password</label>
        <input
          type="password"
          placeholder="Enter old password"
          autoComplete="on"
          value={password}
          onChange={() => passwordHandel(event)}
        />
        <label> New password</label>
        <input
          type="password"
          placeholder="Enter new password"
          autoComplete="on"
          value={newpassword}
          onChange={() => newPasswordHandel(event)}
        />
        </div>
        <button type="sumbit"> change password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
