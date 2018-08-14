import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import './Questions.css';

class Questions extends Component {
    handleRemove = (index) => {
        console.log("handle remove index: " + index);
        this.props.removeQuestion(index);
    }
    render() {
        return (
            <div className="question">
                {this.props.questions.map((question, index) => {
                    return (
                        <Card title={question.question} subTitle={question.type.nombre} className="card ui-card-shadow" key={question.id}>
                            <div className="buttons">
                                <span>
                                    <Button label="Editar" icon="pi pi-trash" iconPos="right" />
                                    <Button label="Eliminar" onClick={() => { this.handleRemove(index) }} icon="pi pi-pencil" iconPos="right" className="ui-button-danger" />
                                </span>
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