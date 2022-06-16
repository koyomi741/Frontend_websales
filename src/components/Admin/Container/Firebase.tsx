// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI8_SLV5zOuvPNz_BOMuuK557aigou9nE",
  authDomain: "test-62604.firebaseapp.com",
  projectId: "test-62604",
  storageBucket: "test-62604.appspot.com",
  messagingSenderId: "499909750878",
  appId: "1:499909750878:web:c23a6aa8c69bdad6af84cf",
  measurementId: "G-6FHRZ6N0T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);