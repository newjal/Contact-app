// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gIrKsTt1M2qfnujHUggLDOOLcTXHDhA",
  authDomain: "vite-contactapp-4f925.firebaseapp.com",
  projectId: "vite-contactapp-4f925",
  storageBucket: "vite-contactapp-4f925.appspot.com",
  messagingSenderId: "328080072357",
  appId: "1:328080072357:web:f0ca8fbc445fda6b05b74c",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 