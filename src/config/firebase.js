// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
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

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
