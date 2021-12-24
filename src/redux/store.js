import { createStore, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';

import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga'

import rootSaga from './root.saga';

import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// create-react-app creates an environment variable called NODE_ENV that lets us check if the environment we are on is dev or prod
// Only use redux-logger when we are in our dev environment
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// To make the code more scalable, apply the spread operator to applyMiddleware
// Anytime we need to add more middleware we just add more to the array of middlewares.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Runs every saga inside rootSaga when a reducer is finished
sagaMiddleware.run(rootSaga);

// Allows us to create a new persisted version of our store
export const persistor = persistStore(store);

const exportObject = {
    store,
    persistor
}

export default exportObject;