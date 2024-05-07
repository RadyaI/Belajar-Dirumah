// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE,
    authDomain: "belajardirumah-796e9.firebaseapp.com",l
    projectId: "belajardirumah-796e9",
    storageBucket: "belajardirumah-796e9.appspot.com",
    messagingSenderId: "851032514440",
    appId: "1:851032514440:web:1769a31cd04652a5d4e43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)