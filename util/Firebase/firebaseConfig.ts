// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx2KtehDlldVYLG-14JzJ9fS0uuphX8tE",
  authDomain: "booktalk-staging.firebaseapp.com",
  projectId: "booktalk-staging",
  storageBucket: "booktalk-staging.appspot.com",
  messagingSenderId: "133047841434",
  appId: "1:133047841434:web:d2ce85ca237aa8c5836523",
  measurementId: "G-SPZ68EHFG5"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
