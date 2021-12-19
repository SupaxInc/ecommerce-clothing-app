import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // For the database
import 'firebase/compat/auth';  // For auth

const firebaseConfig = {
    apiKey: "AIzaSyB3kjxaMGnXxSEVZrGsxfeUc0kAUSTrT7s",
    authDomain: "ecommerce-app-47035.firebaseapp.com",
    projectId: "ecommerce-app-47035",
    storageBucket: "ecommerce-app-47035.appspot.com",
    messagingSenderId: "870703855188",
    appId: "1:870703855188:web:f724b598081a468e5a9fc1",
    measurementId: "G-8SQBW9QKXL"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// Always trigger the google pop up whenever we use the google auth provider for sign in
provider.setCustomParameters({ prompt: 'select_account'}); 
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;