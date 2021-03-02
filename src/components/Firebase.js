import firebase from "firebase";
import "firebase/storage";
// import 'firebase/firestore';

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAHRWzb2dNlaD_OTYM5r3GU-d942LYuGTI",
//     authDomain: "learnandgrow-82f0b.firebaseapp.com",
//     databaseURL: "https://learnandgrow-82f0b-default-rtdb.firebaseio.com",
//     projectId: "learnandgrow-82f0b",
//     storageBucket: "learnandgrow-82f0b.appspot.com",
//     messagingSenderId: "82138091405",
//     appId: "1:82138091405:web:71ccf3984668c7fc1f37c4",
//     measurementId: "G-1PTMF9W2GW"
//   };

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


const storage = firebase.storage();
// var db = firebase.firestore();

// export { firebase, storage as default };
export default firebase;