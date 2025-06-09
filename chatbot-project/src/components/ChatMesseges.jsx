import { ChatMessege } from "./ChatMessege";
import useAutoScroll from "./useAutoScroll";
import './ChatMesseges.css';

export function ChatMesseges({ chatMesseges }) {
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
          <ChatMessege messege={chatMessege.messege} sender={chatMessege.sender}
            key={chatMessege.id} />
        )
      })}
    </div>
  )

}