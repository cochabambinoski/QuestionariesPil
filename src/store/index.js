import {applyMiddleware, createStore, compose} from 'redux';
import reducer from "../reducers";
import {reduxTimeout} from "redux-timeout";
import {logger} from 'redux-logger'

//Estado inicial de nuestra aplicacion
const initialState = {
    idUser: null,
    idMenu: {transaccion: {ruta: 'Start'}},
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // development
//const composeEnhancers = compose; // build

export const store = createStore(
    reducer, initialState,
    composeEnhancers(applyMiddleware(reduxTimeout(), logger) // development
    //composeEnhancers(applyMiddleware(reduxTimeout()) // build
    ),
);