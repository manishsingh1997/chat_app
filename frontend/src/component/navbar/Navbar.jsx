import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import photo from "../assets/human.png";
import apiData from "../api /Apidata";

function Navbar() {
  const navigation = useNavigate();
  const data = localStorage.getItem("token");
  const url = "http://127.0.0.1:8000/logout";
  const logOutHandel = async (e) => {
    e.preventDefault();
    localStorage.clear();
    await apiData(url, "", data);
    navigation("/");
  };
  const [isEnable, setIsEnable] = useState(false);

  return (
    <div className="maincontainer">
      <h2 className="navheading" onClick={() => navigation("/")}>
        CHAT APP
      </h2>
      <div>
        <img
          className="navimage"
          src={photo}
          alt="icon"
          onClick={() => setIsEnable(!isEnable)}
        />
        {isEnable && (
          <div className="clickicon">
            {data ? (
              <div>
                {" "}
                <p className="navpara">Name</p>
                <p className="navpara" onClick={() => navigation("/changepassword")}>
                  Change Password
                </p>
                <p className="navpara" onClick={() => logOutHandel(event)}>Logout</p>
              </div>
            ) : (
              <div>
                <p className="navpara" onClick={() => navigation("/sigup")}>sigup</p>
                <p className="navpara" onClick={() => navigation("/")}>Login</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
