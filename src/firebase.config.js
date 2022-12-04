// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA75jhzlfK3NM_652gD4DTjiIBU3HUUmlc",
  authDomain: "real-estate-app-6ab65.firebaseapp.com",
  projectId: "real-estate-app-6ab65",
  storageBucket: "real-estate-app-6ab65.appspot.com",
  messagingSenderId: "359123205628",
  appId: "1:359123205628:web:84c105996a5fad5fbc4679",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
