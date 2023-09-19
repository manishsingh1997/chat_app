import React, { useState, useEffect } from "react";
import Getapi from "../api /Getapi";

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");
  const getuserurl = "http://127.0.0.1:8000/getUser";

  useEffect(async () => {
    const data = await Getapi(getuserurl, token);
    const subscription={
      email: data.email
    }

    const ws = new WebSocket("ws://127.0.0.1:8000/users");
    ws.onopen = () => {
      ws.send(JSON.stringify(subscription))
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message,"=============>")
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };


    return () => {
      ws.close(); // Close the WebSocket connection when the component unmounts
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Messages:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage({ text: "Hello, WebSocket!" })}>
        Send Message
      </button>
    </div>
  );
}

export default WebSocketComponent;
