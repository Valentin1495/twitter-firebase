import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBZv6DhuVqvoTpH9fwpml-UllALwIwLLeo",
    authDomain: "twitter-9e5bc.firebaseapp.com",
    projectId: "twitter-9e5bc",
    storageBucket: "twitter-9e5bc.appspot.com",
    messagingSenderId: "998580967016",
    appId: "1:998580967016:web:de93502930be94411a4ddd"
  };

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();