import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const changeHandel = (e) => {
    e.preventDefault();
    apiData({
      email: email,
      old_password: password,
      new_password: newpassword,
    });
    setEmail("");
    setNewPassword("");
    setPassword("");
  };
  async function apiData(data) {
    await axios
      .post("http://127.0.0.1:8000/changePassword", data)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }
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
    <div>
      <form onSubmit={() => changeHandel(event)}>
        <label>email</label>
        <input type="email" value={email} onChange={() => emailHandel(event)} />
        <label> old password</label>
        <input
          type="password"
          autoComplete="on"
          value={password}
          onChange={() => passwordHandel(event)}
        />
        <label> new password</label>
        <input
          type="password"
          autoComplete="on"
          value={newpassword}
          onChange={() => newPasswordHandel(event)}
        />
        <button type="sumbit"> change password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
