// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_KEY),
  authDomain:String(import.meta.env.VITE_AUTH_DOMAIN) ,
  projectId:String(import.meta.env.VITE_PROJECT_ID) ,
  storageBucket:String(import.meta.env.VITE_STORAGE_BUCKET) ,
  messagingSenderId:String(import.meta.env.VITE_MESSAGING_SENDER_ID) ,
  appId: String(import.meta.env.VITE_APP_ID)
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();




