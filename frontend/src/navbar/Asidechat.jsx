import React, { useState } from "react";
import apiData from "../api /Apidata";
import Getapi from "../api /Getapi";

function Asidechat() {
  const [friend, setFriend] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [massages, setMessages] = useState("");
  const addfriendurl = "http://127.0.0.1:8000/sendMessage";
  const getuserurl = "http://127.0.0.1:8000/getUser";
  const token = localStorage.getItem("token");

  const userHandel = (e) => {
    setUseremail(e.target.value);
  };
  const massageHendal = (e) => {
    setMessages(e.target.value);
  };
  const addFriend = async () => {
    const data = await Getapi(getuserurl, token);

    if (data?.email) {
      const addfrienddata = await apiData(
        addfriendurl,
        {
          email: data?.email,
          userEmail: useremail,
          massage: massages,
        },
        token
      );

      if (addfrienddata === true) {
        alert("Friend Add ");
      } else {
        setFriend(!friend);
      }
    }
  };
  return (
    <div>
      <button onClick={() => setFriend(!friend)}> + Add friends </button>
      {friend ? (
        <div>
          <input
            placeholder="Enter user name "
            type="text"
            onChange={() => userHandel(event)}
          />{" "}
          <input
            type="text"
            placeholder="enter  massage here"
            onChange={() => massageHendal(event)}
          />
          <button onClick={() => addFriend()}> sand</button>
        </div>
      ) : null}
    </div>
  );
}

export default Asidechat;
