import firebase from "firebase";
import "firebase/storage";
// import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3migkelnCeXcpf6B8Rp2Z3Km203Sx2ic",
  authDomain: "learn-and-grow-2021.firebaseapp.com",
  databaseURL: "https://learn-and-grow-2021-default-rtdb.firebaseio.com/",
  projectId: "learn-and-grow-2021",
  storageBucket: "learn-and-grow-2021.appspot.com",
  messagingSenderId: "1049436115508",
  appId: "1:1049436115508:web:b57901a972bb51ea27f061",
  measurementId: "G-B5DCNN9Y98"
};
  // 1049436115508-mtd0h319fam7ss0avrgnsl9omjv7g0td.apps.googleusercontent.com

// Initialize Firebase
const storage = firebase.storage();
// var db = firebase.firestore();

export default storage;
