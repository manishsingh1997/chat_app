import React, { useEffect, useState } from "react";
import apiData from "../api /Apidata";
import Getapi from "../api /Getapi";
import {WebSocketData} from "../api /Websocket"

import "./chat.css";

function Chat() {
  const [friend, setFriend] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [massages, setMessages] = useState("");
  const [email,setEmail]=useState('')
  const url = "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");
  const userHandel = (e) => {
    setUseremail(e.target.value);
  };
  const massageHendal = (e) => {
    setMessages(e.target.value);
  };

  const [agentLogs] = WebSocketData( "users",email );
  useEffect(()=>{
    console.log(agentLogs);
  },[email,agentLogs])
 
  
  const addFriend = async () => {
    const data = await Getapi(`${url}/getUser`, token);
    setEmail(data.email)
    const response = await Getapi(`${url}/getAllUsers`, token);
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let filteruseremail;
    if (useremail.match(mailformat) && useremail != "") {
      filteruseremail = response.filter((el) => el.email === useremail);
    } else {
      alert("Email not valid");
    }

    if (filteruseremail.length > 0) {
      const addfrienddata = await apiData(`${url}/sendMessage`, {
        email: data?.email,
        userEmail: useremail,
        message: massages,
      });
      if (addfrienddata === true) {
        alert("Friend Add ");
        setUseremail("");
        setMessages("");
      } else {
        setFriend(!friend);
      }
    } else {
      alert("user already ");
    }
  };
  return (
    <div className="chatcontainer">
      <button className="addfriendbtn" onClick={() => setFriend(!friend)}>
        {" "}
        Add friends{" "}
      </button>
      {friend ? (
        <div className="insidechat">
          <input
            className="chatinput"
            placeholder="Enter user name "
            type="text"
            onChange={() => userHandel(event)}
          />{" "}
          <input
            className="chatinput"
            type="text"
            placeholder="enter  massage here"
            onChange={() => massageHendal(event)}
          />
          <button className="sandbtn-" onClick={() => addFriend()}>
            {" "}
            sand
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
