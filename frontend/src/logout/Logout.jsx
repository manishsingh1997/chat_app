import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout({ respo }) {
  const navigation = useNavigate();

  const data = localStorage.getItem("token");
  console.log(data);

  const logOutHandel = (e) => {
    e.preventDefault();
    apiData();
    navigation("/");
  };

  async function apiData() {
    await axios
      .post(
        "http://127.0.0.1:8000/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data}`,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <button onClick={() => logOutHandel(event)}>Logout</button>
      <button onClick={()=>navigation("/passwordchange")}> change password</button>
    </div>
  );
}

export default Logout;
