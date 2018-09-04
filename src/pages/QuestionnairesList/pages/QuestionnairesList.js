import React, { Component } from 'react';
import './QuestionnairesList.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import Constants from '../../../Constants.json';
import { Link } from 'react-router-dom'
import axios from 'axios';

class Questionnaires extends Component {
    constructor() {
        super();
        this.state = {
            questionnaires: []
        };
        this.see = this.see.bind(this);
        this.edit = this.edit.bind(this);
    };
    see() {
        this.growl.show({ severity: 'info', summary: 'See questionnaire', detail: '' });
    }
    edit() {
        this.growl.show({ severity: 'info', summary: 'Edit questionnaire', detail: '' });
    }
    componentDidMount() {
        axios.get(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then((response) => {
                this.setState({ questionnaires: response.data });
              })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="questionnaire">
                <Growl ref={(el) => this.growl = el} />
                {
                    this.state.questionnaires.map((item) => {
                        return (
                            <Card title={item.name} className="card ui-card-shadow" key={item.id}>
                                <div>
                                    <div className="light-text">Creado</div>
                                    <div className="normal-text">{item.fechaId} {item.usuarioId}</div>
                                    <br />
                                    <span>
                                        <Link to={`/questionnaires/${item.id}`}>
                                            <Button label="Ver" />
                                        </Link>
                                        <Link to={`/questionnaires/edit/${item.id}`}>
                                            <Button label="Editar" className="ui-button-info" />
                                        </Link>
                                    </span>
                                </div>
                            </Card>
                        )
                    })
                }

                <Link to={`/questionnaires/new`}>
                    <Button label="Nuevo" />
                </Link>
            </div>
        );
    }
}

export default Questionnaires;