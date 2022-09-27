// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//firebase Config object:
const firebaseConfig = {
  apiKey: "AIzaSyAl9l4W1m7pREhu6c41cdsO7a-qv1XwiNs",
  authDomain: "booktalk-b17e0.firebaseapp.com",
  projectId: "booktalk-b17e0",
  storageBucket: "booktalk-b17e0.appspot.com",
  messagingSenderId: "1029067192642",
  appId: "1:1029067192642:web:67180f7ade952c0fb070db",
  measurementId: "G-991BD62CH0",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
