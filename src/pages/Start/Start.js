import React, {Component, Fragment} from 'react';
import {Chart} from 'primereact/chart';
import {ScrollPanel} from "primereact/scrollpanel";

export class Start extends Component {

    render() {
        return (
            <Fragment>
                <img  style={{height: '60%', with: '60%'}} src={require('./../../images/logo.svg')} className="icons" alt="SVM REACT"/>
            </Fragment>
        )
    }
}