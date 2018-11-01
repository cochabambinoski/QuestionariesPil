import React from 'react';
import ReactDOM from 'react-dom';
import '../src/layout/layout.css'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {store} from './store/index'
import InitialPage from "./pages/InitialPage/InitialPage";

ReactDOM.render(
    <Provider store={store}>
        <InitialPage/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
