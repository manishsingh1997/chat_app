import { useEffect, useState } from 'react';


const WebSocketData = (url, email) => {
  const subscription = {
    email: email
  };
  console.log(JSON.stringify(subscription))
  const [data, setData] = useState();
  useEffect(() => {
    if (email) {
      const ws = new WebSocket(`ws://127.0.0.1:8000/${url}`);

      ws.onopen = () => {
        ws.send(JSON.stringify(subscription));
      };

      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        setData(response);
      };

      return () => {
        ws.close();
      };
    }
  }, [email, data]);

  return [data];
};

export default WebSocketData