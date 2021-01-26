import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from 'pusher-js';
import axios from './axios.js'
function App() {

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      
      setMessages(response.data)
    })
  },[])


  useEffect(() => {
    const pusher = new Pusher("6043636d27d17345afc8", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("message");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
   

  },[messages]);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
