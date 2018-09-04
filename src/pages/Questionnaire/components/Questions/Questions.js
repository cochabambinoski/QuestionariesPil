import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';
import './Questions.css';

class Questions extends Component {
    handleRemove = (index) => {
        const question = this.props.questions[index];
        if (this.props.assigned && question.id != null) {
            this.props.showError("No se pudo eliminar la pregunta", "El cuestionario ya está asignado");
        } else {
            if (question.id != null) {
                question.operacionId = 0;
                this.props.disableQuestion(index, question);
            } else {
                this.props.removeQuestion(index);
            }
        }
    }
    handleEdit = (index) => {
        this.props.editQuestion(index);
    }
    render() {
        return (
            <ScrollPanel style={{ width: '100%', height: '400px' }} className="custombar1">
                <div style={{  lineHeight: '1.5' }}>
                    {this.props.questions.map((question, index) => {
                        return (
                            question.operacionId == 1 ?
                                <Card title={question.question} subTitle={question.type.nombre} className="card ui-card-shadow" key={question.id}>
                                    <div >
                                        {
                                            this.props.readOnly ?
                                                <Button label="Ver" onClick={() => { this.props.seeQuestion(index) }} />
                                                :
                                                <span>
                                                    <Button label="Editar" onClick={() => { this.handleEdit(index) }} icon="pi pi-pencil" iconPos="right" />
                                                    <Button label="Eliminar" onClick={() => { this.handleRemove(index) }} icon="pi pi-trash" iconPos="right" className="ui-button-danger" />
                                                </span>
                                        }
                                    </div>
                                </Card> :
                                <div></div>
                        )
                    })
                    }
                </div>
            </ScrollPanel>
        );
    }
}

export default Questions;