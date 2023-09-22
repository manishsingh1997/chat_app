import { useEffect, useState } from 'react'; 
export const WebSocketData = (url ,email) => {
  const subscription = {
    email: email
  };
  const [data, setData] = useState();
  useEffect(() => {
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
  )

  return [data];
};