import React, {Component, Fragment} from 'react';

class SplashPage extends Component {
    render() {
        return (
            <Fragment>
                <img style={{height: '60%', with: '60%'}} src={require('../../images/logo.svg')} className="icons" alt="SVM REACT"/>
            </Fragment>
        );
    }
}

export default SplashPage;
