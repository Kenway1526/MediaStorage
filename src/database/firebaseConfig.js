import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Pega aquí TUS datos de la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCn1-iLmOX3aYIqKoCpzhcfZWs-l8ncsIU",
  authDomain: "almaimavid.firebaseapp.com",
  projectId: "almaimavid",
  storageBucket: "almaimavid.firebasestorage.app",
  messagingSenderId: "196097954024",
  appId: "1:196097954024:web:81fc4b76a9983fde36395d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const strg = getStorage(app);