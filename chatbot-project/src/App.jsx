import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMesseges } from './components/ChatMesseges';
import './App.css'

function App() {
  
  const [chatMesseges, setChatMesseges] = useState([]);

  // const chatMesseges = array[0];
  // const setChatMesseges = array[1];
  // const [chatMesseges, setChatMesseges] = array
  return (
    <div className="app-container">
      <div>
        {chatMesseges.length === 0 && (
          <p className="welcome-message">
            Welcome to the chatbot project!
            Send a message using the textbox below.
          </p>
        )}
      </div>
      <ChatMesseges chatMesseges={chatMesseges} />
      <ChatInput chatMesseges={chatMesseges} setChatMesseges={setChatMesseges} />
    </div>
  )
}

export default App
