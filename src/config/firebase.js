// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkDzC_qsLYmIsBHEbjdwM9R9sW_u9iPNk",
  authDomain: "attendance-f38f8.firebaseapp.com",
  projectId: "attendance-f38f8",
  storageBucket: "attendance-f38f8.appspot.com",
  messagingSenderId: "818198646942",
  appId: "1:818198646942:web:fe731a557281f1bda1ab8f",
  measurementId: "G-RBD941GQ7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)