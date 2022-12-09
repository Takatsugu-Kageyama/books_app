// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//firebase Config object:
const firebaseConfig = {
  apiKey: "AIzaSyCTwMKd6Grv2Qw2WQkcZzgAKz3CsYjS8Wo",
  authDomain: "booktalk-b19d8.firebaseapp.com",
  projectId: "booktalk-b19d8",
  storageBucket: "booktalk-b19d8.appspot.com",
  messagingSenderId: "781862730715",
  appId: "1:781862730715:web:19d719f37bea149d3245fe",
  measurementId: "G-4Y2WP05VSV"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
