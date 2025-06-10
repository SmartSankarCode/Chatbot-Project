import { useState, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput';
import { ChatMesseges } from './components/ChatMesseges';
import './App.css'

function App() {
  const storageMesseges = JSON.parse(localStorage.getItem('messeges')) || [];
  
  const [chatMesseges, setChatMesseges] = useState(storageMesseges);

  // const chatMesseges = array[0];
  // const setChatMesseges = array[1];
  // const [chatMesseges, setChatMesseges] = array

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
  },[])

  useEffect(() => {
    localStorage.setItem('messeges', JSON.stringify(chatMesseges))
  }, [chatMesseges])


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
