import { useState } from 'react'
import dayjs from 'dayjs';
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
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    // setChatMesseges(newChatMesseges);
    setChatMesseges([
      ...newChatMesseges,
      {
        messege: <img src={LoadingSpinner} height="20px" />,//'Loading...',
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    // console.log(response);
    setChatMesseges([
      ...newChatMesseges,
      {
        messege: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
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

  function clearMesseges() {
    setChatMesseges([]);
  }

  return (
    <div className="input-block">
      <input placeholder="Send a messege to chatbot" size="30"
        onChange={saveInputText} onKeyDown={handleKeyDown}
        value={inputText} className="input-text" />
      <button onClick={sendMessege} className="send-button" >Send</button>
      <button onClick={clearMesseges} className="clear-button" >Clear</button>
    </div>
  )
}