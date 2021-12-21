import { createStore, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';

import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

// To make the code more scalable, apply the spread operator to applyMiddleware
// Anytime we need to add more middleware we just add more to the array of middlewares.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Allows us to create a new persisted version of our store
export const persistor = persistStore(store);

const exportObject = {
    store,
    persistor
}

export default exportObject;