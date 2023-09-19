import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import photo from "../assets/human.png";

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
      <h2 onClick={() => navigation("/")}>CHAT APP</h2>
      <div>
        <img src={photo} alt="icon" onClick={() => setIsEnable(!isEnable)} />
        {isEnable && (
          <div className="clickicon">
            {data ? (
              <div>
                {" "}
                <p>Name</p>
                <p onClick={() => navigation("/changepassword")}>
                  Change Password
                </p>
                <p onClick={() => logOutHandel(event)}>Logout</p>
              </div>
            ) : (
              <div>
                <p onClick={() => navigation("/sigup")}>sigup</p>
                <p onClick={() => navigation("/")}>Login</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
