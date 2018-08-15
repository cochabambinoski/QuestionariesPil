import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import Questionnaires from './pages/Questionnaires/pages/Questionnaires.js';

ReactDOM.render(<Questionnaires />, document.getElementById('root'));
registerServiceWorker();
