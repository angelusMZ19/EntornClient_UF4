// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVokw-TufVDKWG7FKKwb58RT63Na-3RP0",
  authDomain: "movie-m6.firebaseapp.com",
  projectId: "movie-m6",
  storageBucket: "movie-m6.appspot.com",
  messagingSenderId: "400541916931",
  appId: "1:400541916931:web:3505bd9399f327a9bb1336"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db