import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyC3wbjY8_X_FjlqeMXwz2exWlm_wwzJ8x4",
  authDomain: "shop-feb5e.firebaseapp.com",
  databaseURL: "https://shop-feb5e.firebaseio.com",
  projectId: "shop-feb5e",
  storageBucket: "shop-feb5e.appspot.com",
  messagingSenderId: "957564984775",
  appId: "1:957564984775:web:6004b896957c36383d4de2",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
