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
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ questionnaires: data });
                console.log("state", this.state.questionnaires);
            })
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
                                        <Button label="Editar" onClick={this.edit} className="ui-button-info" />
                                    </span>
                                </div>
                            </Card>
                        )
                    })
                }

                <Link to={`/questionnaires/new`}>
                    <Button label="Nuevo" onClick={this.newQuestionnaire} />
                </Link>
            </div>
        );
    }
}

export default Questionnaires;