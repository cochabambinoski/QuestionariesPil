import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Home from "./pages/Home/pages/Home";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import {Map as map }from 'immutable'
import { composeWithDevTools } from 'redux-devtools-extension';
import { reduxTimeout} from 'redux-timeout';
import {logger} from 'redux-logger';

const store = createStore(
    reducer,
    map(),
    composeWithDevTools(
        applyMiddleware(
            logger,
            reduxTimeout()
        )
    ),
);

ReactDOM.render(
        <Router>
            <Provider store={store}>
                <Home/>
            </Provider>
        </Router>
    , document.getElementById('root'));
registerServiceWorker();
