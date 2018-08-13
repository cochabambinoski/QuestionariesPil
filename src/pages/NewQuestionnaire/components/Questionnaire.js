import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './Questionnaire.css';

class Questionnaire extends Component {
    constructor() {
        super();
        this.state = {};
    };
    render() {
        return (
            <div className="questionnaire">
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Nuevo cuestionario</h1>
                    </div>
                </div>


                <div className="content-section implementation">
                    <span className="ui-float-label">
                        <InputText id="float-input" type="text" size="30" value={this.state.value2} onChange={(e) => this.setState({ value2: e.target.value })} />
                        <label htmlFor="float-input">Nombre del cuestionario</label>
                    </span>
                    <br/>
                    <span className="ui-float-label">
                        <InputText id="float-input" type="text" size="30" value={this.state.value2} onChange={(e) => this.setState({ value2: e.target.value })} />
                        <label htmlFor="float-input">Descripcion</label>
                    </span>
                </div>

            </div>
        );
    }
}

export default Questionnaire;