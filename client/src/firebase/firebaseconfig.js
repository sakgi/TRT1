import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import getAuth 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyB43Ee1ernaGx9Baer5VzKAYRsC5rjr3Ow",
  authDomain: "ticket-raiser-a3891.firebaseapp.com",
  databaseURL: "https://ticket-raiser-a3891-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ticket-raiser-a3891",
  storageBucket: "ticket-raiser-a3891.appspot.com",
  messagingSenderId: "8867769997",
  appId: "1:8867769997:web:a0535292f96dd2830dfcc4",
  measurementId: "G-FQ4401W9Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export {db, auth, storage};