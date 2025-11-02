import './App.css';
import { useEffect, useState } from 'react';
import { socket } from './socket';
import { Chat } from './components/chat';

function App() {
  const [isConnected, setIsConntected] = useState(socket.connected);
  const [messageEvents, setMessageEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConntected(true);
    }

    function onDisconnect() {
      setIsConntected(false);
    }

    function onMessageEvent(value: string) {
      console.log(value);
      setMessageEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, []);

  return (
    <div className="container">
      <Chat messages={messageEvents} />
    </div>
  );
}

export default App;
