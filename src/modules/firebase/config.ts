// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO3wCWECwNM-9JAhYCNEF9q2dBgQQrSJQ",
    authDomain: "ftd-app-442d5.firebaseapp.com",
    projectId: "ftd-app-442d5",
    storageBucket: "ftd-app-442d5.firebasestorage.app",
    messagingSenderId: "527279251866",
    appId: "1:527279251866:web:5e8c99ceed16334e0c9a23",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
