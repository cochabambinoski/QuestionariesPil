import React, {Component, Fragment} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {RadioButton} from 'primereact/radiobutton';
import ButtonAcceptCancel from "./ButtonAcceptCancel";

class MultipleOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sleQuest: {question: null}
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.addOption = this.addOption.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    validateFields() {
        if (this.props.lsOptions.length === 0) {
            this.props.showError("Añada una opcion", "");
            return false;
        } else {
            let emptyOptions = this.props.lsOptions.filter((option) => {
                if (option.option === "") {
                    this.props.showError("Tiene opciones vacías!", "");
                    return option;
                }
            });
            if (emptyOptions.length > 0) {
                return false;
            }
        }
        return true;
    }

    addOption() {
        let newOption = {
            "id": null,
            "question": null,
            "option": "",
            "sociedadId": 'BO81',
            "usuarioId": this.props.user.username,
            "operacionId": 1,
            "fechaId": null
        };
        this.props.addOption(newOption);
    }

    addQuestion() {
        if (this.validateFields())
            this.props.addQuestion();
    }

    updateOption(value, index) {
        if (this.props.assigned) {
            if (this.props.lsOptions[index].id != null) {
                this.props.showError("", "No se puede actualizar la opción de un cuestionario ya asignado");
            } else {
                this.props.updateOption(value, index);
            }
        } else {
            this.props.updateOption(value, index);
        }
    }

    isDependent(index) {
        return this.props.questions.find((q) => {
            if (q.questionOption !== null && this.props.lsOptions[index].id !== null) {
                if (q.questionOption.id === this.props.lsOptions[index].id) {
                    return q;
                }
            }
        });
    }

    removeOption(index) {
        if (this.props.assigned) {
            if (this.props.lsOptions[index].id != null) {
                this.props.showError("", "No se puede eliminar la opción de un cuestionario ya asignado");
            } else {
                if (this.isDependent(index) === undefined) {
                    this.props.removeOption(index);
                } else {
                    this.props.showError("", "No se puede eliminar la opción de un cuestionario que tiene dependencia");
                }
            }
        } else {
            if (this.isDependent(index) === undefined) {
                this.props.removeOption(index);
            } else {
                this.props.showError("", "No se puede eliminar la opción de un cuestionario que tiene dependencia");
            }
        }
    }

    handleClose = () => {
        for (let i = 0; i < this.props.lsOptions.length; i++) {
            if (this.props.lsOptions[i].option === "") {
                this.removeOption(i);
            }
        }
        this.props.handleClose();
    };

    render() {
        const {readOnly, lsOptions} = this.props;
        return (
            <Fragment>
                <div style={{
                    paddingBottom: '15px',
                    paddingTop: '10px',
                    width: '640px',
                    overflow: 'auto',
                    maxHeight: '150px',
                    marginBottom: '10px'
                }}>
                    {
                        lsOptions.map((option, index) => {
                            // noinspection RequiredAttributes,JSUnresolvedVariable
                            return (
                                option.operacionId === 1 ?
                                    <div style={{display: 'flex', flexDirection: 'row', margin: '2px'}} key={index}>
                                        <RadioButton value={option.option} checked={false}/>
                                        {
                                            readOnly ?
                                                <div>{option.option}</div> :
                                                <div>
                                                    <InputText value={option.option}
                                                               placeholder="Opción"
                                                               onChange={(e) => this.updateOption(e.target.value, index)}/>
                                                    <Button icon="pi pi-minus" onClick={() => {
                                                        this.removeOption(index);
                                                    }}/>
                                                </div>
                                        }
                                    </div> : null
                            );
                        })
                    }
                </div>
                <br/>
                {
                    readOnly ? <div/> :
                        <ButtonAcceptCancel addQuestion={this.addQuestion} handleClose={this.props.handleClose}>
                            <Button label="Añadir opcion" onClick={this.addOption}/>
                        </ButtonAcceptCancel>
                }
            </Fragment>
        );
    }
}

export default MultipleOption;
