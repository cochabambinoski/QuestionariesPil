import React, { Component } from 'react';
import './QuestionnairesList.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { Switch, Route } from 'react-router-dom';
import Questionnaire from '../../Questionnaire/pages/Questionnaire/Questionnaire';
import { Link } from 'react-router-dom'

class Questionnaires extends Component {
    constructor() {
        super();
        this.state = {
            questionnaires: [
                {
                    "id": 1,
                    "name": "Test1",
                    "description": "descripcion1",
                    "lsQuestions": [
                        {
                            "id": 2,
                            "question": "Test2",
                            "lsQuestionOptions": []
                        }
                    ],
                    "sociedadId": "BO81",
                    "usuarioId": "bvega",
                    "operacionId": 1,
                    "fechaId": "Aug 9, 2018 5:30:08 PM"
                },
                {
                    "id": 2,
                    "name": "Test2",
                    "description": "descripcion1",
                    "lsQuestions": [
                        {
                            "id": 2,
                            "question": "Test2",
                            "lsQuestionOptions": []
                        }
                    ],
                    "sociedadId": "BO81",
                    "usuarioId": "bvega",
                    "operacionId": 1,
                    "fechaId": "Aug 9, 2018 5:30:08 PM"
                },
                {
                    "id": 3,
                    "name": "Test3",
                    "description": "descripcion1",
                    "lsQuestions": [
                        {
                            "id": 2,
                            "question": "Test2",
                            "lsQuestionOptions": []
                        }
                    ],
                    "sociedadId": "BO81",
                    "usuarioId": "bvega",
                    "operacionId": 1,
                    "fechaId": "Aug 9, 2018 5:30:08 PM"
                }
            ]
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
    /* componentDidMount() {
         fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
             .then(results => {
                 return results.json();
             }).then(data => {
                 this.setState({ questionnaires: data });
                 console.log("state", this.state.questionnaires);
             })
     }*/
    render() {
        const routes = () => (
            <main>
                <Switch>
                    <Route path='/questionnaire:id' component={Questionnaire} />
                </Switch>
            </main>
        )
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

                                        <Button label="Ver" onClick={this.see} />
                                        <Button label="Editar" onClick={this.edit} className="ui-button-info" />
                                        <li key={item.id}>
                                            <Link to={`/questionnaire/${item.id}`}>{item.name}</Link>
                                        </li>
                                    </span>

                                    <div>
                                        <Route path='/questionnaire:id' component={Questionnaire} />
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                }



                <Button label="Nuevo" onClick={this.newQuestionnaire} />
            </div>
        );
    }
}

export default Questionnaires;