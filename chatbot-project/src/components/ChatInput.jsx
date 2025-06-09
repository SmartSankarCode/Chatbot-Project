import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css';


export function ChatInput({ chatMesseges, setChatMesseges }) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessege() {

    if (isLoading || inputText == '') {
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
        messege: <img src={LoadingSpinner} height="20px" />,//'Loading...',
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

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessege();
    } else if (event.key === 'Escape') {
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