import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Checkbox} from 'primereact/checkbox';
import {InputText} from 'primereact/inputtext';
import ButtonAcceptCancel from "./ButtonAcceptCancel";
import Button from "@material-ui/core/Button";
import {blue} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Remove from '@material-ui/icons/Remove'

const BlueButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
        marginRight: 5,
    },
}))(Button);

const BlueButtonMinus = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
        width: 5,
        marginLeft: 5,
    },
}))(Button);

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
        let i;
        for (i = 0; i < this.props.lsOptions.length; i++) {
            if (this.props.lsOptions[i].option === '')
                this.removeOption(i);
        }
        this.props.handleClose();
    };

    render() {
        const {lsOptions, readOnly} = this.props;
        return (
            <div style={{marginBottom: '20px'}}>
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
                            return (
                                option.operacionId === 1 ?
                                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
                                        <Checkbox checked={false}/>
                                        <span>
                                        {
                                            readOnly ?
                                                <div>{option.option}</div> :
                                                <div>
                                                    <InputText value={option.option}
                                                               placeholder="Opción"
                                                               onChange={(e) => this.updateOption(e.target.value, index)}/>
                                                    <BlueButtonMinus onClick={() => {
                                                        this.removeOption(index);
                                                    }}>
                                                        <Remove/>
                                                    </BlueButtonMinus>
                                                </div>
                                        }
                                        </span>
                                    </div> : null
                            );
                        })
                    }
                </div>
                {
                    readOnly ? <div/> :
                        <ButtonAcceptCancel addQuestion={this.addQuestion} handleClose={this.props.handleClose}>
                            <BlueButton label="Añadir opcion" onClick={this.addOption}
                                        className='ui-button-secondary'>
                                Añadir Opción
                            </BlueButton>
                        </ButtonAcceptCancel>
                }
            </div>
        );
    }
}

export default MultipleSelection;
