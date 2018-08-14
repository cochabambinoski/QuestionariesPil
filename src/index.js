import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import QuestionnaireList from './pages/QuestionnairesList/pages/QuestionnairesList.js';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <QuestionnaireList />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
