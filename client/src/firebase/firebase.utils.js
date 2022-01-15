import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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

// Grabs the current user that is logged in auth object
export const getCurrentUser = () => {
    // Need to return a promise so we can use yield/await
    return new Promise((resolve, reject) => {
        // Create an onAuthStateChanged listener
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            // Unsubscribe from the onAuthStateChanged when the user's sign in changes
            unsubscribe();
            // return the userAuth object or a null value if it does not exist
            resolve(userAuth);
        
        }, reject)
    })
}

// Making an API request to store the authenticated user to the database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // If the authenticated user does not exist then exit the function
    if(!userAuth) return;

    // Query the logged in authenticated user from the users collection
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // Get the document snapshot from the document reference object
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
            });
        }
        catch (err) {
            console.log("User could not be created: ", err.message);
        }
    }

    // We need to return userRef as we might need the data to use in the future.
    return userRef;
}

// Convert the collection snapshot to an array we can use in our Shop page component
export const convertCollectionsSnapshotToMap = (collections) => {
    // Grab the docs array of document snapshots and convert it to a new array of objects with properties that we need
    const transformedCollection = collections.docs.map(doc => {
        // .data() turns the snapshot into an object
        const { title, items } = doc.data();

        return {
            // Need to encode characters before passing as a URL
            routeName: encodeURI(title.toLowerCase()),
            // Grab the ID of the document from Firestore
            id: doc.id,
            title,
            items
        }
    });

    return  transformedCollection.reduce((acc, collection) => {
        // Assign an empty object with a property of the collection title then equal it to the collection
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});

}

// Saves the users cart to Firebase using the user id
export const saveCartToUserDocument = async (userAuth, cart) => {
    try {
        // Grab the document reference object of the user that is currently logged in
        const userRef = firestore.doc(`users/${userAuth.uid}`)
        // Grab the snapshot from the document ref object
        const userSnapshot = await userRef.get();
        // Retrieve the data from the snapshot
        const { createdAt, displayName, email } = await userSnapshot.data();
        // If the user exists then save the cart inside the reference object
        if(userSnapshot.exists) {
            await userRef.set({
                cart,
                createdAt,
                displayName,
                email
            });
        }
    }
    catch (error) {
        console.log("Cart could not be saved: ", error.message);
    }
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Always trigger the google pop up whenever we use the google auth provider for sign in
googleProvider.setCustomParameters({ prompt: 'select_account'}); 
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;