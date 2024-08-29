// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgCU21ABihsvkc7MA24IlhuBdTrQRKTRA",
  authDomain: "chat-1c663.firebaseapp.com",
  projectId: "chat-1c663",
  storageBucket: "chat-1c663.appspot.com",
  messagingSenderId: "431301770812",
  appId: "1:431301770812:web:37183ef230b60a1db28d39",
  measurementId: "G-L0G75KQ7KP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authenticate the user anonymously
signInAnonymously(auth)
  .catch((error) => {
    console.error('Error signing in anonymously:', error);
  });

// HTML elements
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messagesDiv = document.getElementById('messages');

// Reference to the 'messages' collection
const messagesCollection = collection(db, 'messages');

// Send message function
sendMessageButton.addEventListener('click', async () => {
  const message = messageInput.value;
  if (message.trim() !== '') {
    try {
      await addDoc(messagesCollection, {
        message: message,
        timestamp: Date.now()
      });
      messageInput.value = '';
    } catch (error) {
      console.error('Error adding message:', error);
    }
  }
});

// Listen for new messages
onSnapshot(messagesCollection, (snapshot) => {
  messagesDiv.innerHTML = ''; // Clear existing messages
  snapshot.forEach((doc) => {
    const messageData = doc.data();
    const messageElement = document.createElement('div');
    messageElement.textContent = messageData.message;
    messagesDiv.appendChild(messageElement);
  });
});
