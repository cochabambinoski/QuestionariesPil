import React, {Component} from 'react';
import {themePrimary} from "./styles/Themes";
import {Provider} from "react-redux";
import {store} from "./store";
import InitialPage from "./pages/InitialPage/InitialPage";
import {MuiThemeProvider} from "@material-ui/core";

class App extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider theme={themePrimary}>
                    <Provider store={store}>
                        <InitialPage/>
                    </Provider>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
