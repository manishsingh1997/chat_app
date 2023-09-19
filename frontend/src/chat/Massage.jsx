import React from "react";
import apiData from "../api /Apidata";
import Getapi from "../api /Getapi";

function Massage() {
  const getuserurl = "http://127.0.0.1:8000/getUser";
  const sandmassage = "http://127.0.0.1:8000/sendMessage";
  const token = localStorage.getItem("token");
  const sandMassage = async (e) => {
    e.preventDefault();
    const data = await Getapi(getuserurl, token);
    const config = {
      email: data.email,
      
    };
     const massagr =await apiData(sandmassage, config);
     console.log(massagr);


  };

  return (
    <div>
      <input type="text" placeholder="enter here" />
      <button  onClick={()=>sandMassage(event)}>send</button>
    </div>
  );
}

export default Massage;
