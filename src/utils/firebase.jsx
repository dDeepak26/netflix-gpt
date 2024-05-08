// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_WEB_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-42581.firebaseapp.com",
  projectId: "netflixgpt-42581",
  storageBucket: "netflixgpt-42581.appspot.com",
  messagingSenderId: "303137268855",
  appId: "1:303137268855:web:68a868fb78d59747335272",
  measurementId: "G-J9TFPSJX1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
