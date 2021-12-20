import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger];

// To make the code more scalable, apply the spread operator to applyMiddleware
// Anytime we need to add more middleware we just add more to the array of middlewares.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;