import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* onGoogleSignInStart() {
    // Listening to 'GOOGLE_SIGN_IN_START' action if it has been dispatched
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    // Listening to 'EMAIL_SIGN_IN_START' action if it has been dispatched
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    // Listening to 'CHECK_USER_SESSION' action if it has been dispatched
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch (err) {
        // Dispatch the "SIGN_IN_FAILURE" action
        yield put(signInFailure(err));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        // Sign in with an email and password asynchronously using Auth library
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch (error) {
        yield put(signInFailure(error));
    }
}

// Creates a snapshot from the user auth reference object sent by signing in with google or email
export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        // Dispatch the "SIGN_IN_SUCCESS" action
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    }
    catch(error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        // Receive a userAuth object or null depending on if the state has changed
        const userAuth = yield getCurrentUser();
        // If the userAuth is null, then exit the function and don't dispatch any actions to change the current_user state
        if (!userAuth) return;
        // If the userAuth is not null, dispatch a "SIGN_IN_SUCCESS" action that sets the current_user state
        yield getSnapshotFromUserAuth(userAuth);
    }
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession)
    ])
}