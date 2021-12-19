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

// Making an API request to store the authenticated user to the database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // If the authenticated user does not exist then exit the function
    if(!userAuth) return;

    // Query the logged in authenticated user from the users collection
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // Get the document snapshot from the reference object
    const docSnapShot = await userRef.get();
    
    // If the authenticated user does not exist, create the new authenticated user document inside the user collection.
    // To create the document we need to use the docReference object and not the snapshot.
    // The snapshot only represents the data.
    if(!docSnapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (err) {
            console.log("User could not be created: ", err.message);
        }
    }

    // We need to return userRef as we might need the data to use in the future.
    return userRef;
}

const provider = new firebase.auth.GoogleAuthProvider();
// Always trigger the google pop up whenever we use the google auth provider for sign in
provider.setCustomParameters({ prompt: 'select_account'}); 
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;