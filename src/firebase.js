import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQkrbQc_vVm7DYs5pZG4qb0dD-CYj65K8",
  authDomain: "twitter-clone-38c00.firebaseapp.com",
  projectId: "twitter-clone-38c00",
  storageBucket: "twitter-clone-38c00.appspot.com",
  messagingSenderId: "554460598293",
  appId: "1:554460598293:web:5e985a60a9acf174f47e1c",
  measurementId: "G-L00X44R8HL"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export {db, auth, firebaseApp};