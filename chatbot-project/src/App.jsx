import { useState, useRef, useEffect } from 'react'
import { Chatbot} from 'supersimpledev'
import LoadingSpinner from './assets/loading-spinner.gif'
import RobotImage from './assets/robot.png'
import UserImage from './assets/user.png'

import './App.css'

function ChatInput({chatMesseges, setChatMesseges}) {

      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      function saveInputText (event) {
        setInputText(event.target.value);
      }

      async function sendMessege() {

        if(isLoading || inputText == ''){
          return;
        }

        setIsLoading(true);

        setInputText('');

        const newChatMesseges = [
          ...chatMesseges,
          {
            messege: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ]

        // setChatMesseges(newChatMesseges);
        setChatMesseges([
          ...newChatMesseges,
          {
            messege: <img src={LoadingSpinner} height="20px"/>,//'Loading...',
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        // console.log(response);
        setChatMesseges([
          ...newChatMesseges,
          {
            messege: response,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);

        setIsLoading(false);

      }

      function handleKeyDown (event) {
          if(event.key === 'Enter'){
            sendMessege();
          }else if(event.key === 'Escape'){
            setInputText('');
          }
        }
      return (
        <div className="input-block">
          <input placeholder="Send a messege to chatbot" size="30"
            onChange={saveInputText} onKeyDown={handleKeyDown} 
            value={inputText} className="input-text" />
          <button onClick={sendMessege} className="send-button" >Send</button>
        </div>
      )
    }

    function ChatMessege ({messege, sender}) {
      return (
        <div className={sender==='user'?'user-block':'robot-block'}>
          {sender === 'robot' && <img src={RobotImage} className="chat-icons"/>}
          <div className={sender==='user'? 'user-chat-text'
           :'robot-chat-text'}>
            {messege }
          </div>
          {sender === 'user' && <img src={UserImage} className="chat-icons"/>}
        </div>
      )
    }

    function ChatMesseges ({chatMesseges}) {
      /*
      const chatMessegeRef = React.useRef(null);

      React.useEffect(() => {
        const messegeContainerElem = chatMessegeRef.current;
        if(messegeContainerElem) {
          messegeContainerElem.scrollTop = messegeContainerElem.scrollHeight;
        }
      },[chatMesseges])
      */
      const chatMessegeRef = useAutoScroll(chatMesseges);

      return (
        <div className="chat-messeges-container" ref={chatMessegeRef}>
          {chatMesseges.map(chatMessege => {
            return (
              <ChatMessege messege={chatMessege.messege}  sender={chatMessege.sender}
                key={chatMessege.id}/>
            )
          })}
        </div>
      )

    }

    function useAutoScroll(dependencies) {
      const containerRef = useRef(null);

      useEffect(() => {
        const containerElem = containerRef.current;
        if(containerElem) {
          containerElem.scrollTop = containerElem.scrollHeight;
        }
      },[dependencies])

      return containerRef;
    }

function App (){

      const [chatMesseges, setChatMesseges] = useState([ ]);

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
          <ChatInput chatMesseges={chatMesseges} setChatMesseges={setChatMesseges}/>
        </div>
      )
    }

export default App
