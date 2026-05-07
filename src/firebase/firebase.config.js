// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY",
  authDomain: "YOUR_NEW_AUTH_DOMAIN",
  projectId: "YOUR_NEW_PROJECT_ID",
  storageBucket: "YOUR_NEW_STORAGE_BUCKET",
  messagingSenderId: "YOUR_NEW_SENDER_ID",
  appId: "YOUR_NEW_APP_ID",
  measurementId: "YOUR_NEW_MEASUREMENT_ID"
  /*
  Old Credentials:
  apiKey: "AIzaSyB0Ihy_CwPMnvxqGywXCXb9LSZUAqXL_UU",
  authDomain: "herba-gold1.firebaseapp.com",
  projectId: "herba-gold1",
  storageBucket: "herba-gold1.firebasestorage.app",
  messagingSenderId: "92306400084",
  appId: "1:92306400084:web:d33740ae28666fd5a81ec1",
  measurementId: "G-QGN04PWCQT"
  */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
