// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATYYiJE8e4K0jF0OB9eNDh8YeEm_QqP3Q",
  authDomain: "work-place-nov-bd97b.firebaseapp.com",
  projectId: "work-place-nov-bd97b",
  storageBucket: "work-place-nov-bd97b.appspot.com",
  messagingSenderId: "1046510670986",
  appId: "1:1046510670986:web:875f812648017370d80973",
  measurementId: "G-Z222SK8SM4"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db = getFirestore(app);