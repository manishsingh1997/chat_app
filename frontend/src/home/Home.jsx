import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigation =useNavigate()
    const sidupHandel =()=>{
       navigation("/sinup")
    }
    const logInHandel =()=>{
        navigation("/loginpage")
    }
  return (
    <div>
        <h1> Hi.. there let chat with  people's</h1>
      <button onClick={()=>sidupHandel()}>Create New Account </button>
      <button onClick={()=>logInHandel()}>login</button>
    </div>
  );
}

export default Home;
