import React, {Component} from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div>
            <div className="LandingPage">
                <div>
                    <h1 className="title">Supervisiones</h1>
                    <p className="Category-description">Ingrese iniciando su sesión en SVM</p>
                </div>
            </div>
        </div>
    }
}