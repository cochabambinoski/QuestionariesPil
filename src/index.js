import React from 'react';
import ReactDOM from 'react-dom';
import '../src/layout/layout.css'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {store} from './store/index'
import InitialPage from "./pages/InitialPage/InitialPage";
import { MuiThemeProvider} from '@material-ui/core/styles';
import {themePrimary} from './styles/Themes';

ReactDOM.render(
    <MuiThemeProvider theme={themePrimary}>
        <Provider store={store}>
            <InitialPage/>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
