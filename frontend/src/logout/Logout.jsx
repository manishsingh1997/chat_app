import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiData from "../api /Apidata";

function Logout() {
  const navigation = useNavigate();
  const data = localStorage.getItem("token");
  const url = "http://127.0.0.1:8000/logout";
  const logOutHandel = async (e) => {
    e.preventDefault();
    localStorage.clear()
    await apiData(url, "", data);
    navigation("/");
  };

  return (
    <div>
      <button onClick={() => logOutHandel(event)}>Logout</button>
   
    </div>
  );
}

export default Logout;
