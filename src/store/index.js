import {applyMiddleware, compose, createStore} from 'redux';
import reducer from "../reducers";
import {reduxTimeout} from "redux-timeout";
import {logger} from 'redux-logger'
import thunk from 'redux-thunk';

//Estado inicial de nuestra aplicacion
const initialState = {};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // development
const composeEnhancers = compose; // build

export const store = createStore(
    reducer, initialState,
    //composeEnhancers(applyMiddleware(reduxTimeout(), logger, thunk) // development
    composeEnhancers(applyMiddleware(reduxTimeout(), thunk) // build
    ),
);
