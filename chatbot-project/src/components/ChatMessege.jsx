import dayjs from 'dayjs';
import RobotImage from '../assets/robot.png';
import UserImage from '../assets/user.png';
import './ChatMessege.css';


export function ChatMessege({ messege, sender, time }) {
  return (
    <div className={sender === 'user' ? 'user-block' : 'robot-block'}>
      {sender === 'robot' && <img src={RobotImage} className="chat-icons" />}
      <div className={sender === 'user' ? 'user-chat-text'
        : 'robot-chat-text'}>
        {messege}
        {time && (
          <div className={sender === 'user'?'user-message-time':'robot-message-time'}>
           {dayjs(time).format('h:mma')} 
          </div>
          )}
      </div>
      {sender === 'user' && <img src={UserImage} className="chat-icons" />}
    </div>
  )
}