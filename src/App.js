import {useEffect, useState} from 'react'
import './App.css';
import StackHeader from './Components/StackHeader';
import Dashboad from './Components/Dashboad';

function App() {



  const [ws, setWs] = useState(null);

  const [stockData, setStockData] = useState(null);
  useEffect(() => {
    const socket = new WebSocket('wss://wstest.fxempire.com?token=btctothemoon');
    setWs(socket);

    socket.onopen = () => {
      const subscribeMessage = {
        type: 'SUBSCRIBE',
        instruments: ['s-aapl'],
      };
      socket.send(JSON.stringify(subscribeMessage));
    };

    socket.onmessage = (event) => {
      // Handle the message data here
      var json = JSON.parse(event.data)
      // console.log('data', JSON.parse(event.data))

      setStockData({last: json['s-aapl'].last, change: json['s-aapl'].change, percentChange: json['s-aapl'].percentChange, lastUpdate: json['s-aapl'].lastUpdate})
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
        ws.onopen = null;
        ws.onmessage = null;
        ws.onerror = null;
        setWs(null);
      }
    };
  }, []);

  // const sendMessage = (message) => {
  //   if (ws && ws.readyState === WebSocket.OPEN) {
  //     ws.send(JSON.stringify(message));
  //   }
  // };

  


  return (
    <div className="App">

      <StackHeader stockInfo = {stockData} />
      <Dashboad />
      
    </div>
  );
}

export default App;
