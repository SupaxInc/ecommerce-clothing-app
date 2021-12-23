import ShopActionTypes from "./shop.types";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_START
    }
}

export const fetchCollectionsStartAsync = () => {
    // Returning a function instead of an object which receives a dispatch (redux-thunk middleware)
    // We are now able to dispatch inside of the function
    return (dispatch) => {
        // Get the collection reference object of the collections
        const collectionRef = firestore.collection('collections');

        // Runs the fetchCollectionsStart action across all reducers
        // Switches the isFetching state to true from shop.reducer
        dispatch(fetchCollectionsStart());

        collectionRef.get()
        .then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

            // Change the isFetching state to false and update the collections state to the new collection that was mapped from Firestore
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(err => {
            // Change the isFetching state to false and update the error message state
            dispatch(fetchCollectionsFailure(err.message))
        });
    }
}

export const fetchCollectionsSuccess = collectionsMap => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
}

export const fetchCollectionsFailure = errorMessage => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
}