import React, {Component} from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div className="ui-g">
            <div className="LandingPage">
                <div className="ui-g-12">
                    <h1 className="title">Supervisiones</h1>
                    <p className="Category-description">Ingrese iniciando su sesión en SVM</p>
                </div>
            </div>
        </div>
    }
}