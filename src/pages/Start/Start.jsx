import React, {Component, Fragment} from 'react';
import './Start.scss';

export class Start extends Component {

    render() {
        return (
            <Fragment>
                <img  className="logo"
                      src={require('./../../images/logo.svg')}  alt="SVM REACT"/>
            </Fragment>
        )
    }
}
