import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sigup from "./component/sigup/Sigup";
import Login from "./component/login/Login";
import Navbar from "./component/navbar/Navbar";
import ChangePassword from "./component/changepassword/ChangePassword";
import Chat from "./component/chat/Chat";

function App() {
  
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sigup" element={<Sigup />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
