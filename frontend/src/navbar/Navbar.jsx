import React from 'react'
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigation = useNavigate()
  return (
    <div>
        <h3 onClick={()=>navigation('/')}>Home</h3>
        <p onClick={()=>navigation('/sinup')}>Create Account </p>
        <p onClick={()=>navigation('/loginpage')}>Login</p>
    </div>
  )
}

export default Navbar