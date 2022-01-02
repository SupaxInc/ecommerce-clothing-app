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
    yield takeLatest(CartActionTypes.SAVE_CART_SUCCESS, saveCart);
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

export function* saveCartStart({payload: cart}) {
    yield put(saveCartSuccess(cart));
}

export function* saveCart({payload: cart}) {
    try {
        const userAuth = yield getCurrentUser();
        yield call(saveCartToUserDocument, userAuth, cart);
        yield put(signOutStart());
    }
    catch (error) {
        yield put(saveCartFailure(error));
    }
}

export function* cartSagas() {
    yield(all([
        call(onSignOutSuccess), 
        call(onSaveCartStart),
        call(onSaveCartSuccess)
    ]))
}