// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './styles/firstpage.module.css';

// function ChatRoom() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     setMessages([...messages, { text: message, user: 'You' }]);
//     setMessage('');
//   };

//   const handleSignOut = () => {
//     navigate('/login');
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.chatHeader}>
//         <h2>Chat Room</h2>
//         <button onClick={handleSignOut}>Sign Out</button>
//       </div>
//       <div className={styles.chatMessages}>
//         {messages.map((msg, index) => (
//           <div key={index} className={styles.chatMessage}>
//             <span>{msg.user}: </span>
//             <span>{msg.text}</span>
//           </div>
//         ))}
//       </div>
//       <div className={styles.chatInput}>
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatRoom;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMessage, subscribeToMessages } from '../firebase/firebasePage/firebase'; // firebase.js dosyasından fonksiyonları import ediyoruz
import styles from './styles/firstpage.module.css';

function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe(); // Component unmount olduğunda unsubscribe yapılıyor
  }, []);

  const handleSendMessage = () => {
    sendMessage(message, 'You'); // sendMessage fonksiyonunu kullanarak mesajı gönderiyoruz
    setMessage('');
  };

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>Chat Room</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.chatMessage}>
            <span>{msg.user}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
