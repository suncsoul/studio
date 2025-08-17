
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoDJpiQSAoqJoQcxnR-6TYK4pAMpJKJ8I",
  authDomain: "goodluck-5pbn8.firebaseapp.com",
  projectId: "goodluck-5pbn8",
  storageBucket: "goodluck-5pbn8.firebasestorage.app",
  messagingSenderId: "966790246062",
  appId: "1:966790246062:web:13e5c9c60ae7cafe7a873f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
