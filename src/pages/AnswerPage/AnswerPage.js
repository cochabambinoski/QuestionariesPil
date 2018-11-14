import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getClientsByNitOrNameInSystem, getClientUserByClient, saveAnswers} from "../../actions/indexthunk";
import ClientVerifier from '../../components/ClientVerifier';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import QuestionContainer from "./QuestionContainer";
import {Button} from 'primereact/button';
import {getClient, getinterviewedName, getIsSavingAnswer, getMarkedOptions} from "../../reducers";
import {setSavingAnswer, triedToSave} from "../../actions";
import {Messages} from 'primereact/messages';
import Link from "react-router-dom/es/Link";
import {indexRoute} from "../../routes/PathRoutes";

class AnswerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: props.questionnaire,
            client: null,
            interviewedName: "",
            openClientModal: true,
            searchClient: "",
            clientsList: [],
            firstTimeOpen: true,
            showMinCharsMessage: false,
        };
        this.handleSave = this.handleSave.bind(this);
    }

    setClientAndInterviewed = (client, interviewedName) => {
        this.setState({client, interviewedName});
    };

    showMessage = (title, message) => {
        this.messages.show({severity: 'warn', summary: title, detail: message});
    };

    modalState = value => {
        this.setState({openClientModal: value});
    };

    handleCancel = () => {
        this.props.openConfirmationDialog();
    };

    handleSave = () => {
        if (this.props.isSavingAnswer) return;
        this.props.triedToSave(true);
        if (this.allQuestionsHaveAnswers()) {
            this.props.setSavingAnswer(true);
            const answers = [this.getAnswer()];
            this.props.saveAnswers(answers)
                .then(response => {
                    this.props.setSavingAnswer(false);
                    if (response.toString() === "OK")
                        this.props.saveSuccessful('Respuesta guardada con éxito', 'Gracias por participar.');
                    else
                        this.props.saveFailed('No se pudo guardar la respuesta', 'Ocurrió un error durante el guardado. Disculpe las molestias.');
                });
        } else this.showMessage('', 'Quedan preguntas por responder!');
    };

    allQuestionsHaveAnswers = () => {
        let allQuestionsHaveAnswers = true;
        this.state.questionnaire.lsQuestions.forEach(question => {
            if (question.required === 1) {
                const details = this.props.markedOptions[question.id];
                if (question.questionOption === null || this.questionOptionIsMarked(question.questionOption))
                    if (details === undefined || details === null || details.length === 0 || details[0].answer === "")
                        allQuestionsHaveAnswers = false;
            }
        });
        return allQuestionsHaveAnswers;
    };

    getQuestionPrecondition = questionId => {
        const question = this.state.questionnaire.lsQuestions.find(q => {
            return parseInt(q.id, 10) === parseInt(questionId, 10)
        });
        return question !== null ? question.questionOption : null;
    };

    getAnswer = () => {
        const format = require('date-format');
        const markedOptions = this.props.markedOptions;
        let details = [];
        Object.keys(markedOptions).forEach(key => {
            const precondition = this.getQuestionPrecondition(key);
            if (precondition === null || (precondition !== null && this.questionOptionIsMarked(precondition))) {
                details.push.apply(details, markedOptions[key]);
            }
        });
        const client = this.props.client !== null ? this.props.client.value : null;
        const system = this.props.questionnaire.system.nombre;
        return {
            id: null,
            questionary: this.state.questionnaire.id,
            client: system === 'SVM' && client !== null ? client.id : null,
            interviewedName: system === 'POS' && client !== null ? client.nombreFactura : this.props.interviewedName === '' ? null : this.props.interviewedName,
            latitude: null,
            longitude: null,
            replicated: 1,
            answerDate: format("yyyy-MM-dd", new Date()),
            sociedadId: 'BO81',
            usuarioId: 'admin',
            operacionId: 1,
            fechaId: null,
            lsAnswerDetails: details,
            idClientPos: system === 'POS' && client !== null ? client.id : null,
            nitPos: system === 'POS' && client !== null ? client.nit : null,
        };
    };

    questionOptionIsMarked = precondition => {
        const markedOptions = this.props.markedOptions[precondition.question.id];
        let option = null;
        if (markedOptions !== null && markedOptions !== undefined) {
            option = markedOptions.filter(detail => {
                return detail.answerDetail === precondition.option;
            })
        }
        return option !== null && option.length !== 0;
    };

    render() {
        return (
            <div>
                <ClientVerifier
                    modalState={this.modalState}
                    openClientModal={this.state.openClientModal}
                    setClientAndInterviewed={this.setClientAndInterviewed}
                    questionnaire={this.state.questionnaire}
                    invalidateQuestionnaire={this.props.invalidateQuestionnaire}/>
                <div style={{margin: '20px'}} className="client-input" onClick={() => {
                    this.setState({openClientModal: true})
                }}>
                    <div className="client-input-label">Cliente</div>
                    <div className="client-input-name">
                        {
                            this.state.client !== null ?
                                <div>{this.state.client.label}</div> :
                                this.state.interviewedName !== "" ?
                                    <div>{this.state.interviewedName}</div> : null
                        }
                    </div>
                </div>

                <Messages ref={(el) => this.messages = el}/>

                <QuestionContainer index={this.props.selectedIndex}
                                   questions={this.props.structure[this.props.selectedIndex]}
                                   handleMenuClick={this.props.handleMenuClick}
                                   structure={this.props.structure}/>

                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <Button label="Guardar" onClick={
                        this.handleSave
                    }
                            className='green-button'
                            style={{
                                fontSize: '20px',
                                display: 'inline-block',
                                marginRight: '15px'
                            }}/>


                    <Link to={indexRoute}>
                        <Button label="Salir" onClick={
                            this.handleCancel
                        }
                                className='red-button'
                                style={{
                                    fontSize: '20px',
                                    display: 'inline-block',
                                    marginLeft: '15px'
                                }}/>
                    </Link>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    markedOptions: getMarkedOptions(state),
    client: getClient(state),
    interviewedName: getinterviewedName(state),
    isSavingAnswer: getIsSavingAnswer(state),
});

const mapDispatchToProps = dispatch => ({
    getClientsByNitOrNameInSystem: (searchTerm, system) => dispatch(getClientsByNitOrNameInSystem(searchTerm, system)),
    getClientUserByClient: value => dispatch(getClientUserByClient(value)),
    saveAnswers: value => dispatch(saveAnswers(value)),
    triedToSave: value => dispatch(triedToSave(value)),
    setSavingAnswer: value => dispatch(setSavingAnswer(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPage);