import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import './Questions.css';
import ModalContainer from "../../../../widgets/Modal/pages/modal";
import Modal from "../../../../widgets/Modal/components/modal";

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentIndex: -1,
        };
    }

    openModal = (index) => {
        this.setState({currentIndex: index});
        this.setState({open: true});
    };

    closeModal = () => {
        this.setState({open: false});
    };

    handleRemove = () => {
        this.closeModal();
        this.setState((prevState, props) => {
            const question = this.props.questions[prevState.currentIndex];
            if (this.props.assigned && question.id != null) {
                this.props.showError("", "No se puede eliminar la pregunta. El cuestionario ya está asignado");
            } else {
                if (question.id != null) {
                    question.operacionId = 0;
                    this.props.disableQuestion(prevState.currentIndex, question);
                } else {
                    this.props.removeQuestion(prevState.currentIndex);
                }
            }
        });
    };
    handleEdit = (index) => {
        this.props.editQuestion(index);
    };

    render() {
        return (
            <div>
                <ModalContainer>
                    <Modal open={this.state.open} title={"Eliminar pregunta"}
                           message={"Está seguro de eliminar la pregunta?"}
                           handleConfirm={this.handleRemove} handleCancel={this.closeModal}>
                    </Modal>
                </ModalContainer>
                <div style={{lineHeight: '1.5'}}>
                    {this.props.questions.map((question, index) => {
                        return (
                            question.operacionId === 1 ?
                                <Card title={question.question} subTitle={question.type.nombre}
                                      className="card ui-card-shadow text" key={question.id}>
                                    <p className="required">{question.required == 1 ? 'Obligatorio':''}</p>
                                    <div>
                                        {
                                            this.props.readOnly ?
                                                <Button label="Ver" onClick={() => {
                                                    this.props.seeQuestion(index)
                                                }}/>
                                                :
                                                <span>
                                                    <Button label="Editar" onClick={() => {
                                                        this.handleEdit(index)
                                                    }} icon="pi pi-pencil" iconPos="right"/>
                                                    <Button label="Eliminar" onClick={() => {
                                                        this.openModal(index)
                                                    }} icon="pi pi-trash" iconPos="right" className="ui-button-danger"/>
                                                </span>
                                        }
                                    </div>
                                </Card>
                                :
                                <div/>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

export default Questions;