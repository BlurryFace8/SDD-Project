// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sdd-project-df64e.firebaseapp.com",
  projectId: "sdd-project-df64e",
  storageBucket: "sdd-project-df64e.firebasestorage.app",
  messagingSenderId: "219898002491",
  appId: "1:219898002491:web:f63df4086f931e4b13301e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);