import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {RadioButton} from 'primereact/radiobutton';
import {ScrollPanel} from "../../../../../node_modules/primereact/scrollpanel";

class MultipleOption extends Component {
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
            <div className="ui-g" style={{width: '350px', marginBottom: '10px'}}>
                    <div style={{paddingBottom: '15px', paddingTop: '10px', overflow:'auto', maxHeight:'150px', width: '100%',  marginBottom: '10px'}}>
                        {
                            this.props.lsOptions.map((option, index) => {
                                return (
                                    option.operacionId === 1 ?
                                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}} key={index}>
                                            <RadioButton value={option.option} checked={false}/>
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
                                        </div> : null
                                )
                            })
                        }
                    </div>
                <br/>
                {
                    this.props.readOnly ? <div></div> :
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

export default MultipleOption