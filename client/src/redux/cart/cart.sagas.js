import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

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

export function* cartSagas() {
    yield(all([
        call(onSignOutSuccess)
    ]))
}