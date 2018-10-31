import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {InputText} from 'primereact/inputtext';

class MultipleSelection extends Component {
    constructor(props) {
        super(props);
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
            let emptyOptions = this.props.lsOptions.filter((option) => (option.option !== ""));
            if (emptyOptions.length === 0) {
                return false;
            }
        }
        return true;
    }

    addOption() {
        let newOption = {
            "id": null,
            "question": null,
            "option": "Opcion",
            "sociedadId": 'BO81',
            "usuarioId": this.props.user.username,
            "operacionId": 1,
            "fechaId": null,
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

    removeOption(index) {
        if (this.props.assigned) {
            if (this.props.lsOptions[index].id != null) {
                this.props.showError("", "No se puede eliminar la opción de un cuestionario ya asignado");
            } else {
                this.props.removeOption(index);
            }
        } else {
            this.props.removeOption(index);
        }
    }

    render() {
        return (
            <div style={{width: '370px', marginBottom: '10px'}}>
                    <div style={{paddingBottom: '15px', paddingTop: '10px', width: '100%', overflow:'auto', maxHeight: '150px', marginBottom: '10px'}}>
                        {
                            this.props.lsOptions.map((option, index) => {
                                return (
                                    option.operacionId === 1 ?
                                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
                                            <Checkbox checked={false}/>
                                            <span>
                                    {
                                        this.props.readOnly ?
                                            <div>{option.option}</div> :
                                            <div>
                                                <InputText value={option.option}
                                                           onChange={(e) => this.updateOption(e.target.value, index)}/>
                                                <Button icon="pi pi-minus" onClick={() => {
                                                    this.removeOption(index)
                                                }}/>
                                            </div>
                                    }
                                </span>
                                        </div> : null
                                )
                            })
                        }
                    </div>
                {
                    this.props.readOnly ? <div/> :
                        <div style={{width: '400px'}}>
                            <Button label="Añadir opcion" onClick={this.addOption} className="ui-button-secondary"/>


                            <span>
                                <Button label="Aceptar" onClick={this.addQuestion}/>
                                <Button label="Cancelar" onClick={this.props.handleClose} className="ui-button-danger"/>
                            </span>
                        </div>
                }
            </div>
        );
    }
}

export default MultipleSelection