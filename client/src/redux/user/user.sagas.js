import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* onGoogleSignInStart() {
    // Listening to 'GOOGLE_SIGN_IN_START' action if it has been dispatched
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    // Listening to 'EMAIL_SIGN_IN_START' action if it has been dispatched
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
    // Listening to 'SIGN_OUT_START' action if it has been dispatched
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutAccount);
}

export function* onSignUpStart() {
    // Listening to 'SIGN_UP_START' action if it has been dispatched
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUpAccount);
}

export function* onSignUpSuccess() {
    // Listening to 'SIGN_UP_SUCCESS' action if it has been dispatched
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
    // Listening to 'CHECK_USER_SESSION' action if it has been dispatched
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield call(getSnapshotFromUserAuthAndSignIn, user);
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
        yield call(getSnapshotFromUserAuthAndSignIn, user);
    }
    catch (error) {
        yield put(signInFailure(error));
    }
}

// Creates a snapshot from the user auth reference object sent by signing in with google or email
export function* getSnapshotFromUserAuthAndSignIn(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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
        yield call(getSnapshotFromUserAuthAndSignIn, userAuth)
    }
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOutAccount() {
    try {
        // Sign out the current user that is logged in
        yield auth.signOut();

        // Dispatch the 'SIGN_OUT_SUCCESS' action to change the state of current user to null
        // Also clears the cart state
        yield put(signOutSuccess());
    }
    catch (error) {
        // Dispatch the 'SIGN_OUT_FAILURE' action to add the error message to payload
        yield put(signOutFailure(error));
    }
}

export function* signUpAccount({payload: {displayName, email, password}}) {
    try {
        // Auth method createUserWithEmailAndPassword creates a new user account with specified email and password from Email/Password authentication provider
        // Destructure user auth object from the returned object after the user has been successfully created
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);


        yield put(signUpSuccess({
            user,
            // displayName is in an object because in the function we are destructuring the second parameter
            additionalData: { displayName }
        }))
    }
    catch(error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: { user, additionalData }}) {
    try {
        yield getSnapshotFromUserAuthAndSignIn(user, additionalData)
    }
    catch(error) {
        yield put(signUpFailure(error));
    }
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}