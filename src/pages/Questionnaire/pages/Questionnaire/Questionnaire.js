import React, { Component } from 'react';
import './Questionnaire.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import Question from '../../components/Question/Question.js';
import Questions from '../../components/Questions/Questions.js';
import QuestionnaireRange from '../../components/QuestionnaireRange/QuestionnaireRange.js';
import Constants from '../../../../Constants.json';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
            selectedQuestion: {id:null},
            openQuestion: false,
            assigned: false,
            opened: true,
            selectedQuestionIndex: -1,
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
        this.closeQuestion = this.closeQuestion.bind(this);
        this.setOptionDependency = this.setOptionDependency.bind(this);
        this.contains = this.contains.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);
    };
    showSuccess(summary, detail) {
        this.growl.show({ severity: 'success', summary: summary, detail: detail });
    }
    showError(summary, detail) {
        this.growl.show({ severity: 'error', summary: summary, detail: detail });
    }
    saveQuestionnaire() {
        if (this.state.name == null) {
            this.showError("Campo obligatorio", "Debe especificar el nombre del cuestionario")
            return
        }
        let ranges = []
        this.state.lsBranches.forEach((branch, index) => {
            ranges.push(
                {
                    id: null,
                    questionary: null,
                    city: branch.departamento,
                    branch: branch,
                    sociedadId: 'BO81',
                    usuarioId: this.state.userId,
                    operacionId: 1,
                    fechaId: null,
                },
            )
        });
        let questionaries = [
            {
                id: null,
                name: this.state.name,
                description: this.state.description,
                lsQuestions: this.state.lsQuestions,
                sociedadId: 'BO81',
                usuarioId: this.state.userId,
                operacionId: 1,
                fechaId: null,
            },
        ];
        let strRanges = JSON.stringify(ranges);
        console.log("ranges: " + strRanges);
        let strQuestionaries = JSON.stringify(questionaries);
        console.log("quest: " + strQuestionaries);
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.SAVE_QUESTIONNAIRE_AND_RANGE}?questionaries=${encodeURIComponent(strQuestionaries)}&questionaryRange=${encodeURIComponent(strRanges)}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(results => {
            return results.json();
        }).then(data => {
            if (data === "Ok") {
                this.showSuccess("Transaccion exitosa", "Cuestionario guardado");
                this.setState({ savedSuccessfully: true });
            }
            else {
                this.showError("Error al guardar", data)
            }
        });

    }
    removeQuestion(index) {
        let aux = this.state.lsQuestions
        aux.splice(index, 1)
        this.setState({ lsQuestions: aux });
    }
    addQuestion(question, index) {
        let auxQuestions = [...this.state.lsQuestions];
        if (index == -1) {
            auxQuestions.push(question);
        } else {
            auxQuestions[question];
        }
        this.setState({ lsQuestions: auxQuestions });
        console.log(JSON.stringify(question));
    }
    contains = (list, value) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == value.id) {
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
    handleCloseModal = (event) => {
        this.setState({
            modalVisible: false,
        })
    };

    componentDidMount() {
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_TYPES_BY_CLASS}?classId=${encodeURIComponent('TIPPREG')}`;
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ questionTypes: data });
                console.log("types", this.state.questionTypes);
            });
    }
    getQuestionnaire(id) {
        console.log("inside get questionnaire");
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_QUESTIONNAIRE_BY_ID}?idQuestionary=${encodeURIComponent(id)}`;
        console.log(url);
        fetch(url)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ questionnaireId: data.id });
                this.setState({ name: data.name });
                this.setState({ description: data.description });
                this.setState({ lsQuestions: data.lsQuestions });
                this.setState({ sociedadId: data.sociedadId });
                this.setState({ usuarioId: data.usuarioId });
                this.setState({ operacionId: data.operacionId });
                this.setState({ fechaId: data.fechaId });
                this.setState({ received: false });
            });
        let rangeUrl = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_RANGES_BY_QUESTIONNAIRE}?idQuestionary=${encodeURIComponent(id)}`;
        fetch(rangeUrl)
            .then(results => {
                return results.json();
            }).then(data => {
                const ranges = data;
                let branches = [];
                ranges.forEach((range) => {
                    branches.push(range.branch);
                });
                this.setState({ lsBranches: branches });
            });
    }
    seeQuestion(index) {
        let question = this.state.lsQuestions[index];
        this.setState({ selectedQuestion: question });
        this.setState({ openQuestion: true });
    }
    editQuestion(index) {
        let question = this.state.lsQuestions[index];
        this.setState({ selectedQuestionIndex: index });
        this.setState({ selectedQuestion: question });
        this.setState({ openQuestion: true });
    }
    closeQuestion() {
        this.setState({ selectedQuestionIndex: -1 });
        this.setState({ selectedQuestion: {id:null} });
        this.setState({ openQuestion: false });
    }

    handleNewQuestion(){
        this.setState({ selectedQuestionIndex: -1 });
        this.setState({ selectedQuestion: {id:null} });
        this.setState({ openQuestion: true });
    }
    setOptionDependency(option, question) { }
    render() {
        let readOnly = false;
        if (this.state.savedSuccessfully) {
            return <Redirect to='/questionnaires' />
        }
        if (this.props != undefined && this.props.match != undefined && this.state.received) {
            console.log("props: " + JSON.stringify(this.props));
            const questionnaireId = this.props.match.params.id;
            readOnly = this.props.readOnly;
            this.getQuestionnaire(questionnaireId)
        }
        return (
            <div className="questionnaire">
                <Growl ref={(el) => this.growl = el} />

                <div className="ui-g">
                    <div className="ui-g-6">
                        <div className="content-section implementation">
                            <div className="card card-w-title">
                                {this.props.readOnly ?
                                    <p>{this.state.name}</p>
                                    :
                                    <InputText id="float-input" placeholder="Nombre del cuestionario" type="text" required maxLength="50" size="32" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                }

                            </div>
                            <div className="card card-w-title">
                                {this.props.readOnly ?
                                    <p>{this.state.description}</p>
                                    :
                                    <InputTextarea className="description" placeholder="Descripcion (opcional)" type="text" maxLength="255" size="32" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} rows={5} cols={20} autoResize={false} />
                                }
                            </div>

                        </div>

                        <div className="content-section">
                            <Questions questions={this.state.lsQuestions}
                                removeQuestion={this.removeQuestion}
                                readOnly={this.props.readOnly}
                                seeQuestion={this.seeQuestion}
                                editQuestion={this.editQuestion}></Questions>
                        </div>

                        <div className="content-section button-save">
                            {this.props.readOnly ?
                                <div></div>
                                :
                                <div>
                                    <Button label="Guardar" onClick={this.saveQuestionnaire} />
                                    <Button label="Nueva pregunta" onClick={this.handleNewQuestion} />
                                </div>
                            }
                        </div>
                    </div>

                    <div className="ui-g-6">
                        <QuestionnaireRange selectBranches={this.selectBranches}
                            readOnly={this.props.readOnly}
                            branches={this.state.lsBranches}
                            cities={this.state.lsCities} />
                    </div>
                    {
                        this.state.openQuestion ?
                            <div>
                                <div className="ui-g-12">
                                {console.log(this.state.selectedQuestion.type + "Enviando Pregunta prueba Test 1")}
                                    <Question questionTypes={this.state.questionTypes}
                                        readOnly={this.props.readOnly}
                                        questions={this.state.lsQuestions}
                                        addQuestion={this.addQuestion}
                                        question={this.state.selectedQuestion}
                                        closeQuestion={this.closeQuestion}
                                        assigned={this.state.assigned}
                                        setOptionDependency={this.setOptionDependency}
                                        selectedQuestionIndex={this.state.selectedQuestionIndex} />

                                </div>
                            </div> : <div></div>
                    }
                </div>
            </div>
        );
    }
}

export default Questionnaire;