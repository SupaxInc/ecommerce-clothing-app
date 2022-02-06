import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';

import { CartActionTypes } from './cart.types';
import { clearCart, saveCartFailure, saveCartSuccess } from './cart.actions';

import { signOutStart } from '../user/user.actions';

import { getCurrentUser, saveCartToUserDocument } from '../../firebase/firebase.utils';

export function* onSaveCartStart() {
    yield takeLatest(CartActionTypes.SAVE_CART_START, saveCartStart);
}

export function* onSaveCartSuccess() {
    yield takeLatest(CartActionTypes.SAVE_CART_SUCCESS, saveCartSuccessSignOut);
}

// When a user successfully gets signed out from actions dispatched in user.sagas.js
// Then clear out the cart
export function* onSignOutSuccess() {
    // Listens for a dispatched action 'SIGN_OUT_SUCCESS'
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* clearCartOnSignOut() {
    // Dispatches an action 'CLEAR_CART' to all reducers
    yield put(clearCart());
}

// Used to save the users cart upon sign out
export function* saveCartStart({payload: cart}) {
    try {
        // Grab the user auth object 
        const userAuth = yield getCurrentUser();
        // Call the firebase util function that allows us to save the cart to Firebase
        yield call(saveCartToUserDocument, userAuth, cart);
        // Dispatch action that the cart has been successfully saved
        yield put(saveCartSuccess());
    }
    catch(error) {
        yield put(saveCartFailure(error));
    }
}

// Dispatch user sign out action if the cart is successfully saved to Firestore
export function* saveCartSuccessSignOut() {
    yield put(signOutStart());
}

export function* cartSagas() {
    yield(all([
        call(onSignOutSuccess), 
        call(onSaveCartStart),
        call(onSaveCartSuccess)
    ]))
}