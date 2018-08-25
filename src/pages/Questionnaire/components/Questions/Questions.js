import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './Questions.css';

class Questions extends Component {
    handleRemove = (index) => {
        this.props.removeQuestion(index);
    }
    handleEdit = (index) => {
        this.props.editQuestion(index);
    }
    render() {
        return (
            <div>
                {this.props.questions.map((question, index) => {
                    return (
                        <Card title={question.question} subTitle={question.type.nombre} className="card ui-card-shadow" key={question.id}>
                            <div className="buttons">
                                {
                                    this.props.readOnly ?
                                        <Button label="Ver" onClick={() => { this.props.seeQuestion(index) }}/>
                                        :
                                        <span>
                                            <Button label="Editar" onClick={() => { this.handleEdit(index) }} icon="pi pi-pencil" iconPos="right" />
                                            <Button label="Eliminar" onClick={() => { this.handleRemove(index) }} icon="pi pi-trash" iconPos="right" className="ui-button-danger" />
                                        </span>
                                }
                            </div>
                        </Card>
                    )
                })
                }
            </div>
        );
    }
}

export default Questions;