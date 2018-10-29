import React from 'react';
import ReactDOM from 'react-dom';
import '../src/layout/layout.css'
import registerServiceWorker from './registerServiceWorker';
import Home from "./pages/Home/pages/Home";
import {Provider} from 'react-redux';
import {store} from './store/index'

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
