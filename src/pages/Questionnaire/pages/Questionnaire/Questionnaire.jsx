import React, {Component} from 'react';
import './Questionnaire.scss';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Constants from '../../../../Constants';
import {Growl} from 'primereact/growl';
import {Messages} from 'primereact/messages';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {RadioButton} from 'primereact/radiobutton';
import Question from '../../components/Question/Question.jsx';
import Questions from '../../components/Questions/Questions.jsx';
import QuestionnaireRange from '../../components/QuestionnaireRange/QuestionnaireRange.jsx';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {
    getCreateQuestionary,
    getQuestionarySelected,
    getQuestionnaireStatusTypes,
    getQuestionTypes,
    getReachTypes,
    getSystemTypes,
    getUser
} from "../../../../reducers";
import {changeIdExistingQuestionary, fillOutQuestionaryRangeAll, setMenuContainer} from "../../../../actions/index";
import {withStyles} from '@material-ui/core/styles';
import {ScrollPanel} from 'primereact/scrollpanel';
import {Col, Row} from 'react-flexbox-grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Title from "../../../Title/Title";
import Toolbar from "@material-ui/core/Toolbar";
import ModalContainer from "../../../../components/modal/modal";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {
    getAssignmentsByQuestionnaire,
    getQuestionsTypes,
    getQuetionnaireById,
    getTypeSystemByUser,
    saveQuestionnaire
} from "../../../../actions/indexthunk";
import Link from "react-router-dom/es/Link";
import {questionariesRoute} from "../../../../routes/PathRoutes";
import Button from "@material-ui/core/Button";
import {blue, green, red} from '@material-ui/core/colors';

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

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaireId: null,
            value: null,
            name: null,
            userId: 'jarispe',
            description: '',
            lsQuestions: [],
            lsBranches: [],
            receiveBranches: [],
            lsCities: [],
            savedSuccessfully: false,
            questionTypes: [],
            sociedadId: "BO81",
            usuarioId: null,
            operacionId: 1,
            fechaId: null,
            received: true,
            selectedQuestion: {id: null},
            openQuestion: false,
            assigned: false,
            opened: true,
            selectedQuestionIndex: -1,
            ranges: [],
            expandPanelRange: true,
            lsQuestionsImmutableAux: [],
            immutableQuestion: null,
            system: this.props.systemTypes[0],
            reach: this.props.reachTypes[0],
            status: this.props.questionnaireStatus[0],
            limitPOS: false,
            limitSVM: false,
            limitSystem: null
        };
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.saveQuestionnaire = this.saveQuestionnaire.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.selectBranches = this.selectBranches.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.getQuestionnaire = this.getQuestionnaire.bind(this);
        this.seeQuestion = this.seeQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.assignDenpendentQuestion = this.assignDenpendentQuestion.bind(this);
        this.closeQuestion = this.closeQuestion.bind(this);
        this.setOptionDependency = this.setOptionDependency.bind(this);
        this.contains = this.contains.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.updateRanges = this.updateRanges.bind(this);
        this.disableQuestion = this.disableQuestion.bind(this);
        this.independQuestion = this.independQuestion.bind(this);
    }

    showSuccess(summary, detail) {
        this.growl.show({severity: 'success', summary: summary, detail: detail});
    }

    showError(summary, detail) {
        this.messages.show({severity: 'error', summary: summary, detail: detail});
    }

    showWarning(summary, detail) {
        this.messages.show({severity: 'warn', summary: summary, detail: detail});
    }

    saveQuestionnaire() {
        if (this.state.name == null || this.state.name === "") {
            this.showWarning("", "Debe especificar el nombre del cuestionario");
            return;
        }
        if (this.state.reach == null || this.state.system == null) {
            this.showWarning("", "Seleccione el sistema y el alcance de la encuesta")
            return;
        }
        let ranges = this.state.ranges;

        let questionaries = [
            {
                id: this.state.questionnaireId,
                name: this.state.name,
                description: this.state.description,
                lsQuestions: this.state.lsQuestions,
                system: this.state.system,
                reach: this.state.reach,
                status: this.props.questionnaireStatus[0],
                sociedadId: 'BO81',
                usuarioId: this.props.user.username,
                operacionId: 1,
                fechaId: this.state.fechaId
            }
        ];
        if (questionaries[0].lsQuestions.length === 0) {
            this.showWarning("", "Debe tener al menos una pregunta creada");
            return;
        }
        if (ranges.length === 0) {
            this.showWarning("", "Debe establecer el rango del cuestionario");
            return;
        }
        this.props.saveQuestionnaire(questionaries, ranges)
            .then((result) => {
                switch (result) {
                    case "OK":
                        this.props.showMessage("", "Cuestionario guardado");
                        this.handleCancel();
                        this.props.changeIdQuestionarySelected(null);
                        this.handleBackClick();
                        break;
                    case "ERROR":
                        this.showError("", "Error al guardar");
                        break;
                    default:
                        break;
                }
            });
    }

    handleBackClick = () => {
        this.props.history.goBack();
    };

    removeQuestion(index) {
        let aux = this.state.lsQuestions;
        aux.splice(index, 1);
        this.setState({lsQuestions: aux});
    }

    addQuestion(question, index) {
        let auxQuestions = [...this.state.lsQuestions];
        if (index === -1) {
            auxQuestions.push(question);
        } else {
            // eslint-disable-next-line no-unused-vars
            let auxQuestion = auxQuestions[question];
        }
        this.setState({lsQuestions: auxQuestions});
    }

    contains = (list, value) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === value.id) {
                return i;
            }
        }
        return -1;
    };

    selectBranches(branches) {
        this.setState((prevState, props) => ({
            lsBranches: branches
        }));
    }

    updateRanges(ranges) {
        this.setState((prevState, props) => ({
            ranges: ranges
        }));
    }

    handleCloseModal = (event) => {
        this.setState({
            modalVisible: false
        });
    };

    componentDidMount() {
        this.props.getQuestionsTypes('TIPPREG');
        this.getTypeSystemByUser();
        const {questionnaireId1} = this.props;
        if (questionnaireId1 != null) {
            this.getQuestionnaire(questionnaireId1);
        }
    }

    getTypeSystemByUser() {
        this.props.fetchGetTypeSystemByUser(this.props.user.id)
            .then((result) => {
                if (result != null) {
                    this.setState((prevState, props) => ({
                        limitSystem: result
                    }));
                    if (result !== null && result !== undefined) {
                        if (result.codigoSap === Constants.CODSAP_USER_SYSTEM_POS) {
                            this.setState({limitPOS: true});
                            this.setState({system: this.props.systemTypes[1]});
                        }
                        if (result.codigoSap === Constants.CODSAP_USER_SYSTEM_SVM) {
                            this.setState({limitSVM: true});
                            this.setState({system: this.props.systemTypes[0]});
                        }
                    }
                }
            });
    }

    getQuestionnaire(id) {
        if (id !== undefined) {
            this.props.getQuetionnaireById(id)
                .then((data) => {
                    this.setState({questionnaireId: data.id});
                    this.setState({name: data.name});
                    this.setState({description: data.description});
                    this.setState({lsQuestions: data.lsQuestions});
                    this.setImmutableCopy(data.lsQuestions);
                    this.setState({system: data.system});
                    this.setState({reach: data.reach});
                    this.setState({status: data.status});
                    this.setState({sociedadId: data.sociedadId});
                    this.setState({usuarioId: data.usuarioId});
                    this.setState({operacionId: data.operacionId});
                    this.setState({fechaId: data.fechaId});
                    this.setState({received: false});
                });
            this.props.getAssignmentsByQuestionnaire(id)
                .then((data) => {
                    if (data.length > 0)
                        this.setState({assigned: true});
                });
        }
    }

    setImmutableCopy(lsQuestions) {
        let auxQuestions = [];
        lsQuestions.forEach((question) => {
            let option =
                question.questionOption !== null ? {
                    id: question.questionOption.id,
                    question: {
                        id: question.questionOption.question.id
                    },
                    option: question.questionOption.option,
                    sociedadId: question.questionOption.sociedadId,
                    usuarioId: question.questionOption.usuarioId,
                    operacionId: question.questionOption.operacionId,
                    fechaId: question.questionOption.fechaId
                } : null;
            let auxQuestion = {
                id: question.id,
                questionOption: option,
                lsQuestionOptions: []
            };
            question.lsQuestionOptions.forEach((option) => {
                auxQuestion.lsQuestionOptions.push({option: option.option});
            });
            auxQuestions.push(auxQuestion);
        });
        this.setState({lsQuestionsImmutableAux: auxQuestions});
    }

    seeQuestion(index) {
        let question = this.state.lsQuestions[index];
        this.setState({selectedQuestion: question});
        this.setState({immutableQuestion: null});
        this.setState({openQuestion: true});
    }

    disableQuestion(index, question) {
        let auxQuestions = this.state.lsQuestions;
        auxQuestions[index] = question;
        this.setState({lsQuestions: auxQuestions});
    }

    independQuestion(question) {
        let auxQuestions = this.state.lsQuestions;
        auxQuestions.find((q) => {
            if (q.id === question.id) {
                q.questionOption = null;
                return q;
            }
        });
        this.setState({lsQuestions: auxQuestions});
    }

    editQuestion(index) {
        let question = this.state.lsQuestions[index];
        this.setState({selectedQuestionIndex: index});
        this.setState({selectedQuestion: question});
        this.setState({immutableQuestion: this.state.lsQuestionsImmutableAux[index]});
        this.setState({openQuestion: true});
    }

    assignDenpendentQuestion(index, question) {
        if (this.props.asigned)
            this.showError("No se pueden eliminar opciones de un cuestionario asignado");
        else {
            let auxQuestions = this.state.lsQuestions;
            auxQuestions[index] = question;
            this.setState({lsQuestions: auxQuestions});
        }
    }

    closeQuestion() {
        this.setState({selectedQuestionIndex: -1});
        this.setState({selectedQuestion: {id: null, question: null}});
        this.setState({immutableQuestion: null});
        this.setState({openQuestion: false});
    }

    handleNewQuestion() {
        this.setState({selectedQuestionIndex: -1});
        this.setState({selectedQuestion: {id: null, question: null}});
        this.setState({immutableQuestion: null});
        this.setState({openQuestion: true});
    }

    setOptionDependency(option, question) {
    }

    componentWillMount() {
        if (this.props.questionnaireId !== undefined && this.props.questionnaireId !== null) {
            const questionnaireId = this.props.questionnaireId;
            this.getQuestionnaire(questionnaireId)
        }
    }

    handleCancel() {
        this.props.changeIdExistingQuestionary(null);
    }

    handleSetStatePanelRange = () => {
        const isExpanded = this.state.expandPanelRange;
        if (isExpanded) {
            this.setState({expandPanelRange: false});
        } else {
            this.setState({expandPanelRange: true});
        }
    };

    render() {
        const {classes} = this.props;
        if (this.state.savedSuccessfully) {
            return <Redirect to='/questionnaires'/>
        }
        const {questionnaireId1} = this.props;
        let title = 'Crear Cuestionario';
        let subtitle = 'En esta secci??n podr??s crear nuevos cuestionarios.';
        if (questionnaireId1 != null) {
            title = this.props.readOnly ? 'Ver Cuestionario' : 'Editar Cuestionario';
            subtitle = this.props.readOnly ? 'En esta secci??n podr??s ver tu cuestionario.' : 'En esta secci??n podr??s modificar tu cuestionario.';
        }
        return (
            <div>
                <Growl ref={(el) => this.growl = el}/>
                <Title title={title} subtitle={subtitle}/>
                <Toolbar className="toolbarFullWidth">
                    <div style={{padding: '5px'}}>
                        {this.props.readOnly ?
                            <Row>
                                <Col>
                                    <Link to={questionariesRoute}>
                                        <RedButton label="Cancelar" className="ui-button-primary" onClick={() => {
                                        }}>
                                            Cancelar
                                        </RedButton>
                                    </Link>
                                </Col>
                            </Row>
                            :
                            <Row>

                                <Col>
                                    <BlueButton label="Nueva pregunta" className="ui-button-primary"
                                                onClick={this.handleNewQuestion}>
                                        Nueva pregunta
                                    </BlueButton>
                                </Col>

                                <Col>
                                    <GreenButton label="Guardar" className="primary" onClick={() => {
                                        this.saveQuestionnaire()
                                    }}>
                                        Guardar
                                    </GreenButton>
                                </Col>

                                <Col>
                                    <Link to={questionariesRoute}>
                                        <RedButton label="Cancelar" className="ui-button-primary">
                                            Cancelar
                                        </RedButton>
                                    </Link>
                                </Col>
                            </Row>
                        }
                    </div>
                </Toolbar>
                <Messages ref={(el) => this.messages = el}/>
                <br/>
                <div className="ui-g">

                    <Row xs>
                        <Col xs>
                            <div>
                                <div>
                                    <div className="text card-w-title">
                                        <div>
                                            {this.props.readOnly ?
                                                <h1>{this.state.name}</h1>
                                                :
                                                <div>
                                                    <InputText id="float-input" placeholder="Nombre del cuestionario"
                                                               type="text" style={{marginBottom: '15px'}}
                                                               required maxLength="50" size="51" value={this.state.name}
                                                               onChange={(e) => this.setState({name: e.target.value})}/>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {this.props.readOnly ?
                                                <p>{this.state.description}</p>
                                                :
                                                <InputTextarea className="description"
                                                               placeholder="Descripcion (opcional)"
                                                               type="text" maxLength="255"
                                                               style={{width: '385px'}}
                                                               value={this.state.description}
                                                               onChange={(e) => this.setState({description: e.target.value})}
                                                               rows={4} autoResize={false}/>
                                            }
                                        </div>

                                        <div>
                                            Seleccione a qu?? sistema corresponde la encuesta:
                                            <div className="radio-container">
                                                <div className="radio-item">
                                                    <RadioButton inputId="rb1" name="system"
                                                                 value={this.props.systemTypes[0]}
                                                                 onChange={(e) => this.setState({system: e.value})}
                                                                 checked={this.state.system && this.state.system.nombre === this.props.systemTypes[0].nombre}
                                                                 disabled={this.props.readOnly || this.state.limitPOS}/>
                                                    <label htmlFor="rb1"
                                                           className="p-radiobutton-label">{this.props.systemTypes[0].nombre}</label>
                                                </div>

                                                <div className="radio-item">
                                                    <RadioButton inputId="rb2" name="system"
                                                                 value={this.props.systemTypes[1]}
                                                                 onChange={(e) => this.setState({system: e.value})}
                                                                 checked={this.state.system && this.state.system.nombre === this.props.systemTypes[1].nombre}
                                                                 disabled={this.props.readOnly || this.state.limitSVM}/>
                                                    <label htmlFor="rb2"
                                                           className="p-radiobutton-label">{this.props.systemTypes[1].nombre}</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            Seleccione el alcance de la encuesta:
                                            <div className="radio-container">
                                                <div className="radio-item">
                                                    <RadioButton inputId="rb3" name="reach"
                                                                 value={this.props.reachTypes[0]}
                                                                 onChange={(e) => this.setState({reach: e.value})}
                                                                 checked={this.state.reach && this.state.reach.nombre === this.props.reachTypes[0].nombre}
                                                                 disabled={this.props.readOnly}/>
                                                    <label htmlFor="rb3"
                                                           className="p-radiobutton-label">{this.props.reachTypes[0].nombre}</label>
                                                </div>

                                                <div className="radio-item">
                                                    <RadioButton inputId="rb4" name="reach"
                                                                 value={this.props.reachTypes[1]}
                                                                 onChange={(e) => this.setState({reach: e.value})}
                                                                 checked={this.state.reach && this.state.reach.nombre === this.props.reachTypes[1].nombre}
                                                                 disabled={this.props.readOnly}/>
                                                    <label htmlFor="rb4"
                                                           className="p-radiobutton-label">{this.props.reachTypes[1].nombre}</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <ExpansionPanel expanded={this.state.expandPanelRange}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                                        this.handleSetStatePanelRange()
                                    }}/>}>
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>Rango del Cuestionario</Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <Divider/>
                                    <ExpansionPanelDetails>
                                        <ScrollPanel style={{width: '100%', height: '600px'}}>
                                            <QuestionnaireRange updateRanges={this.updateRanges}
                                                                readOnly={this.props.readOnly}
                                                                system={this.state.system}
                                                                questionnaireId={this.props.questionnaireId !== null ? this.props.questionnaireId : undefined}/>
                                        </ScrollPanel>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>

                        </Col>

                        <Col xs>
                            < ModalContainer>
                                <Dialog
                                    open={this.state.openQuestion}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description">
                                    <DialogTitle id="alert-dialog-title" className="titleBody">
                                        <h1 className="dialogTitle">Pregunta</h1>
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description" className="dialogBody">
                                            <Question questionTypes={this.props.questionTypes}
                                                      readOnly={this.props.readOnly}
                                                      questions={this.state.lsQuestions}
                                                      immutableQuestion={this.state.immutableQuestion}
                                                      addQuestion={this.addQuestion}
                                                      question={this.state.selectedQuestion}
                                                      closeQuestion={this.closeQuestion}
                                                      assigned={this.state.assigned}
                                                      setOptionDependency={this.setOptionDependency}
                                                      selectedQuestionIndex={this.state.selectedQuestionIndex}/>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    </DialogActions>
                                </Dialog>
                            </ModalContainer>
                            <div>
                                <ScrollPanel
                                    style={{width: '100%', height: 'calc(100vh - 310px)'}}>
                                    <Questions questions={this.state.lsQuestions}
                                               removeQuestion={this.removeQuestion}
                                               readOnly={this.props.readOnly}
                                               assigned={this.state.assigned}
                                               showError={this.showError}
                                               showSuccess={this.showSuccess}
                                               seeQuestion={this.seeQuestion}
                                               editQuestion={this.editQuestion}
                                               saveQuestionnaire={this.saveQuestionnaire}
                                               disableQuestion={this.disableQuestion}
                                               independQuestion={this.independQuestion}
                                               assignDenpendentQuestion={this.assignDenpendentQuestion}/>
                                </ScrollPanel>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

Questionnaire.propTypes = {
    questionnaireId1: PropTypes.number
};

const mapStateToProps = state => ({
    questionarySelected: getQuestionarySelected(state),
    constCreateQuestionary: getCreateQuestionary(state),
    user: getUser(state),
    questionTypes: getQuestionTypes(state),
    systemTypes: getSystemTypes(state),
    reachTypes: getReachTypes(state),
    questionnaireStatus: getQuestionnaireStatusTypes(state)
});

const mapDispatchToProps = dispatch => ({
    fillOutQuestionaryRangeAll: value => dispatch(fillOutQuestionaryRangeAll(value)),
    changeIdExistingQuestionary: value => dispatch(changeIdExistingQuestionary(value)),
    setIdMenu: value => dispatch(setMenuContainer(value)),
    changeIdQuestionarySelected: value => dispatch(changeIdExistingQuestionary(value)),
    saveQuestionnaire: (first, second) => dispatch(saveQuestionnaire(first, second)),
    getQuestionsTypes: value => dispatch(getQuestionsTypes(value)),
    getQuetionnaireById: value => dispatch(getQuetionnaireById(value)),
    getAssignmentsByQuestionnaire: value => dispatch(getAssignmentsByQuestionnaire(value)),
    fetchGetTypeSystemByUser: value => dispatch(getTypeSystemByUser(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Questionnaire));
