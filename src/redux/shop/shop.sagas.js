import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsStart() {
    // Creates a saga to run another generator function if the action dispatched to the store type is 'FETCH_COLLECTIONS_START'
    // Only resolves the latest saga if multiple sagas were spawned at the same time
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* fetchCollectionsAsync() {
    try {
        // Get the collection reference object of the collections
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get(); // yield similar to await, we receive a value in promise that gets resolved

        // call is an effect that allows us to run a function with a yield 
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        // put is an effect that allows us to dispatch an action
        yield put(fetchCollectionsSuccess(collectionsMap));
    } 
    catch(err) {
        yield put(fetchCollectionsFailure(err.message));
    }
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}