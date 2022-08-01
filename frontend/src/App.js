
import './App.css';
import io from 'socket.io-client';
import {useState,useEffect} from 'react';

const socket = io('http://localhost:4000');


function App() {
  
  const [message,setMessage] = useState("");
  const [messages, setMessages] = useState([
    {body:"hello",
    from:"user"},
    
  ]);

  const handlesubmit = (e)=>{
    e.preventDefault();
    socket.emit('message',message);
    const newsms = {
      body: message,
      from: "me"
    }
    setMessages([newsms,...messages])
    setMessage("");
  }

  useEffect(()=>{
    const recibeMessage = (message) =>{
      setMessages([message,...messages])
    }
    socket.on('message',recibeMessage);
    
    return ()=>{
      socket.off('message',recibeMessage);
    }
  },[messages])
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      
     <form onSubmit={handlesubmit} className="bg-zinc-900 p-10">
     <h1 className="text-2xl font-bold my-2">Chat with React and socket io</h1>
       <input type= "text" onChange={e => setMessage(e.target.value)} value={message} className="border-2 border-zinc-500 p-2 text-black w-full"/>
      <ul className="h-80 overflow-y-auto">
        {messages.map((message,index) =>( 
        <li key={index} className ={`my-2 p-2 table text-sm rounded-md ${message.from === "me" ? "bg-sky-700 ml-auto":"bg-black"}`} >
          <p>{message.from}: {message.body}</p>
        </li> 
        ))}
     </ul>
     </form>
     
    </div>
  );
}

export default App;
