// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "goodluck-5pbn8",
  "appId": "1:966790246062:web:b912e60cdde4c3517a873f",
  "storageBucket": "goodluck-5pbn8.firebasestorage.app",
  "apiKey": "AIzaSyBoDJpiQSAoqJoQcxnR-6TYK4pAMpJKJ8I",
  "authDomain": "goodluck-5pbn8.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "966790246062"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
