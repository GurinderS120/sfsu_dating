// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcXxXpaXNmMy_4PJzTgkQm7BI-SOTOIzk",
  authDomain: "sfsu-dating.firebaseapp.com",
  projectId: "sfsu-dating",
  storageBucket: "sfsu-dating.appspot.com",
  messagingSenderId: "739598633014",
  databaseURL: "https://sfsu-dating-default-rtdb.firebaseio.com",
  appId: "1:739598633014:web:21dc9c4f6f05b10845f097",
  measurementId: "G-B3LDH05L5X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
