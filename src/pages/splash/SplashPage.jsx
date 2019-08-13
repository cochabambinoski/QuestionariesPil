import React, {Component, Fragment} from 'react';
import './SplashPage.scss'
import {Typography} from "@material-ui/core";
class SplashPage extends Component {
    render() {
        return (
            <Fragment>
                <img style={{height: '60%', with: '60%'}}
                     src={require('../../images/logo.svg')}
                     className="logo"
                     alt="SVM REACT"/>
                     <Typography color={"primary"} className="textLoading">Cargando ...</Typography>
            </Fragment>
        );
    }
}

export default SplashPage;
