import { useState } from 'react'
import './App.css'
import Home from './home/Home'
import  { BrowserRouter ,Route, Routes } from "react-router-dom"
import Sigup from './sigup/Sigup'
import Login from './login/Login'
import Navbar from './navbar/Navbar'
import Logout from './logout/Logout'
import ChangePassword from './changepassword/ChangePassword'


function App() {
  

  return (

    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sinup' element ={<Sigup/>}/>
      <Route path='/loginpage' element={<Login />}/>
      <Route path='/logout' element={<Logout />}/>
      <Route path='/passwordchange' element={<ChangePassword/>}/>
     </Routes>
     </BrowserRouter>
    
      
    </>
  )

}

export default App
