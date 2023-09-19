import { useState } from 'react'
import './App.css'
import  { BrowserRouter ,Route, Routes } from "react-router-dom"
import Sigup from './sigup/Sigup'
import Login from './login/Login'
import Navbar from './navbar/Navbar'
import Logout from './logout/Logout'
import ChangePassword from './changepassword/ChangePassword'
import Chat from './chat/Chat'
import WebSocketComponent from './websocket/Websocket'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/sigup' element ={<Sigup/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route  path ="/chat" element ={<Chat/>}/>
      <Route path="/hlo" element={<WebSocketComponent/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )

}

export default App
