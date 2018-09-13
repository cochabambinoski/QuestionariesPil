import React from 'react';
import ReactDOM from 'react-dom';
import '../src/layout/layout.css'
import registerServiceWorker from './registerServiceWorker';
import Home from "./pages/Home/pages/Home";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index'

ReactDOM.render(
        <Router>
            <Provider store={store}>
                <Home/>
            </Provider>
        </Router>
    , document.getElementById('root'));
registerServiceWorker();
