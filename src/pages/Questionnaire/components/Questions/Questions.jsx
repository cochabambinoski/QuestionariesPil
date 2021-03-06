import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Card} from 'primereact/card';
import './Questions.scss';
import ModalContainer from "../../../../components/modal/modal";
import Modal from "../../../../components/modal/components/modal";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import QuestionDependent from "../Question/QuestionDependent";
import Button from "@material-ui/core/Button";
import {blue, green, red} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/es/styles/withStyles";

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

const RedButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(Button);

const GreenButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
        marginRight: 5,
    },
}))(Button);

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentIndex: -1,
            currentQuestion: null,
            dependentOpen: false,
            newValue: 0
        };
    }

    openModal = (index) => {
        this.setState({currentIndex: index, open: true});
    };

    closeModal = () => {
        this.setState({open: false});
        this.setState({saveOpen: false});
    };

    handleRemove = () => {
        this.closeModal();
        this.setState((prevState, props) => {
            const question = this.props.questions[prevState.currentIndex];
            if (this.props.assigned && question.id != null) {
                this.props.showError("", "No se puede eliminar la pregunta. El cuestionario ya est?? asignado");
            } else {
                if (question.id != null) {
                    question.operacionId = 0;
                    question.lsQuestionOptions.forEach((o) => {
                        let q = this.props.questions.find((q) => {
                            if (q.questionOption !== null) {
                                if (q.questionOption.id === o.id) {
                                    return q.id;
                                }
                            }
                        });
                        if (q !== undefined) {
                            this.props.independQuestion(q);
                        }
                    });
                    //this.props.questions.find
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

    handleSave = () => {
        this.props.saveQuestionnaire();
    };

    handleOpenDependent = (index, question) => {
        const nullQuestions = this.props.questions.find((q) => {
            if (q.id === null) {
                return q;
            }
        });
        if (nullQuestions === undefined || nullQuestions === null) {
            this.setState({dependentOpen: true, currentQuestion: question, currentIndex: index});
        } else {
            this.setState({saveOpen: true});
        }
    };

    handleCloseDependent = (value) => {
        this.setState((prevState, props) => {
            const question = this.props.questions[prevState.currentIndex];
            if (value !== undefined && value !== null) {
                if (value.id !== null)
                    question.questionOption = value;
            }
            else
                question.questionOption = null;
            this.props.assignDenpendentQuestion(prevState.currentIndex, question);
        });
        this.setState({dependentOpen: false});
    };

    cancelDependent() {
        this.setState({dependentOpen: false});
    }

    clickChild = () => {
    };

    renderDependent() {
        const questions = this.props.questions;
        return (
            <Dialog
                open={this.state.dependentOpen}
                onClose={this.handleCloseDependent}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="dialogDependent">
                <DialogTitle id="alert-dialog-title"
                             className="titleBody">
                    <h1 className="dialogTitle">{"Asignacion de dependencia en Pregunta"}</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialogBody">
                        <QuestionDependent currentQuestion={this.state.currentQuestion}
                                           questions={questions}
                                           refresh={(value) => this.handleCloseDependent(value)}
                                           setDependentClick={click => this.clickChild = click}>
                        </QuestionDependent>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <GreenButton label="Guardar" icon="pi pi-check" onClick={() => this.clickChild()}
                                 className="ui-button-primary">
                        Guardar
                    </GreenButton>
                    <RedButton label="Cancelar" icon="pi pi-times"
                               onClick={() => this.cancelDependent()}
                               className="ui-button-primary">
                        Cancelar
                    </RedButton>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return (
            <div>
                <ModalContainer>
                    <Modal open={this.state.open} title={"Eliminar pregunta"}
                           message={"Est?? seguro de eliminar la pregunta?"}
                           handleConfirm={this.handleRemove} handleCancel={this.closeModal}>
                    </Modal>
                    <Modal open={this.state.saveOpen} title={"Guardar cuestionario"}
                           message={"Para asignar dependencias debe guardar el cuestionario. \n ??Est?? seguro que desea guardar este cuestionario ahora?"}
                           handleConfirm={this.handleSave} handleCancel={this.closeModal}>
                    </Modal>
                    <div>
                        {this.renderDependent()}
                    </div>
                </ModalContainer>
                <div style={{lineHeight: '1.5'}}>
                    {this.props.questions.map((question, index) => {
                        return (
                            question.operacionId === 1 ?
                                <Card title={question.question} subTitle={question.type.nombre}
                                      className="card ui-card-shadow text" key={question.id}>
                                    <div className="extras">
                                        {
                                            question.questionOption !== undefined && question.questionOption !== null ?
                                                <label className="dependent">Dependiente</label> :
                                                <label className="independent">Independiente</label>
                                        }
                                        <label
                                            className="required">{question.required === 1 ? 'Obligatorio' : ''}</label>
                                    </div>
                                    <div>
                                        {
                                            this.props.readOnly ?
                                                <Button label="Ver" onClick={() => {
                                                    this.props.seeQuestion(index);
                                                }}/>
                                                :
                                                <span>
                                                    <BlueButton label="Editar"
                                                                onClick={() => {
                                                                    this.handleEdit(index);
                                                                }} icon="pi pi-pencil" iconPos="right"
                                                                className="ui-button-secondary">
                                                        Editar
                                                    </BlueButton>
                                                    <BlueButton label="Dependiente"
                                                                onClick={() => {
                                                                    this.handleOpenDependent(index, question);
                                                                }}
                                                                icon="pi pi-angle-double-down"
                                                                iconPos="right"
                                                                className="ui-button-secondary">
                                                        Dependiente
                                                    </BlueButton>
													<RedButton label="Eliminar"
                                                               onClick={() => {
                                                                   this.openModal(index);
                                                               }}
                                                               icon="pi pi-trash"
                                                               iconPos="right"
                                                               className="ui-button-secondary">
                                                        Eliminar
                                                    </RedButton>
                                                </span>
                                        }
                                    </div>
                                </Card>
                                :
                                <div/>
                        );
                    })
                    }
                </div>
            </div>
        );
    }
}

export default Questions;
