import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Home from "./pages/Home/pages/Home";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Home/>
    </Router>, document.getElementById('root'));
registerServiceWorker();
