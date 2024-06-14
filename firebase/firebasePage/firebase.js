// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDMkpT2I_ZyskvvlF8aapdDb7MUcEvkxd8",
//   authDomain: "realtime-chat-70ea2.firebaseapp.com",
//   databaseURL: "https://realtime-chat-70ea2-default-rtdb.firebaseio.com",
//   projectId: "realtime-chat-70ea2",
//   storageBucket: "realtime-chat-70ea2.appspot.com",
//   messagingSenderId: "857342666231",
//   appId: "1:857342666231:web:d0f0370b2e4be3f341baf2"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

// export const register = async (email, password) => {
//   const { user } = await createUserWithEmailAndPassword(auth, email, password);
//   return user;
// }

// export default app;


import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMkpT2I_ZyskvvlF8aapdDb7MUcEvkxd8",
  authDomain: "realtime-chat-70ea2.firebaseapp.com",
  databaseURL: "https://realtime-chat-70ea2-default-rtdb.firebaseio.com",
  projectId: "realtime-chat-70ea2",
  storageBucket: "realtime-chat-70ea2.appspot.com",
  messagingSenderId: "857342666231",
  appId: "1:857342666231:web:d0f0370b2e4be3f341baf2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export const register = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const sendMessage = (message, user) => {
  const messageRef = ref(database, 'messages');
  const newMessageRef = push(messageRef);
  set(newMessageRef, {
    text: message,
    user: user,
    timestamp: Date.now()
  });
};

export const subscribeToMessages = (callback) => {
  const messageRef = ref(database, 'messages');
  onValue(messageRef, (snapshot) => {
    const data = snapshot.val();
    const messages = data ? Object.keys(data).map(key => data[key]) : [];
    callback(messages);
  });
};

export default app;
