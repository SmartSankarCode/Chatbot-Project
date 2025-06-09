import RobotImage from '../assets/robot.png';
import UserImage from '../assets/user.png';


export function ChatMessege({ messege, sender }) {
  return (
    <div className={sender === 'user' ? 'user-block' : 'robot-block'}>
      {sender === 'robot' && <img src={RobotImage} className="chat-icons" />}
      <div className={sender === 'user' ? 'user-chat-text'
        : 'robot-chat-text'}>
        {messege}
      </div>
      {sender === 'user' && <img src={UserImage} className="chat-icons" />}
    </div>
  )
}