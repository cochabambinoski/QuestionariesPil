import React, {Component} from 'react';
import './ErrorPage.css';

export default class ErrorPage extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div>
            <div className="LandingPage">
                <div>
                    <h1 className="title">Página no disponible</h1>
                    <p className="Category-description">Lamentamos las molestias, inténtelo de nuevo más tarde</p>
                </div>
            </div>
        </div>
    }
}