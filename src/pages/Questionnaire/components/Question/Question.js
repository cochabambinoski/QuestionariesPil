import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {InputSwitch} from 'primereact/inputswitch';
import {Messages} from 'primereact/messages';
import Constants from '../../../../Constants.json';
import MultipleOption from './MultipleOption.js';
import MultipleSelection from './MultipleSelection.js';
import FreeAnswer from './FreeAnswer.js';
import Range from './Range.js';
import Image from './Image.js';
import {connect} from 'react-redux';
import {getUser} from "../../../../reducers";
import {Button} from "../../../../../node_modules/primereact/button";
import './Question.css';

class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			question: null,
			lsOptions: [],
			userId: 'jarispe',
			sociedadId: "BO81",
			operacionId: 1,
			fechaId: null,
			required: 1,
			questionOption: null,
			received: true,
			squestion: null
		};
		this.onTypeChange = this.onTypeChange.bind(this);
		this.addOption = this.addOption.bind(this);
		this.updateOption = this.updateOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
		this.addQuestion = this.addQuestion.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.showError = this.showError.bind(this);
	}

	componentDidMount() {
		if (this.state.squestion === null)
			this.setRequired(false);
	}

	onTypeChange(e) {
		let question = this.state.squestion;
		question.lsQuestionOptions = [];
		question.type = e.value;
		question.required = 0;
		this.setState((prevState, props) => ({
			squestion: question
		}));
	}

	addOption(newOption) {
		let auxQuestion = this.state.squestion;
		auxQuestion.lsQuestionOptions.push(newOption);
		this.setState({squestion: auxQuestion});
	}

	updateOption(value, index) {
		let auxQuestion = this.state.squestion;
		auxQuestion.lsQuestionOptions[index].option = value;
		this.setState({squestion: auxQuestion});
	}

	removeOption(index) {
		if (this.props.asigned)
			this.showError("No se pueden eliminar opciones de un cuestionario asignado");
		else {
			let auxQuestion = this.state.squestion;
			let option = auxQuestion.lsQuestionOptions[index];
			if (option.operacionId === 1) {
				auxQuestion.lsQuestionOptions[index].operacionId = 0;
			} else if (option.operacionId === null) {
				auxQuestion.lsQuestionOptions.splice(index, 1);
			}
			this.setState({squestion: auxQuestion});
		}
	}

	showError(summary, detail) {
		this.messages.show({severity: 'error', summary: summary, detail: detail});
	}

	addQuestion() {
		let question = {
			id: this.state.squestion.id,
			questionary: this.state.squestion.questionary,
			type: this.state.squestion.type,
			questionOption: this.state.squestion.questionOption,
			question: this.state.squestion.question,
			required: this.state.squestion.required,
			lsQuestionOptions: this.state.squestion.lsQuestionOptions,
			sociedadId: 'BO81',
			usuarioId: this.props.user.username,
			operacionId: 1,
			fechaId: null
		};
		this.handleClose();
		this.props.addQuestion(question, this.props.selectedQuestionIndex);
	}

	handleClose() {
		this.setState({
			squestion: {
				id: null,
				questionary: null,
				type: null,
				questionOption: null,
				question: null,
				required: 0,
				lsQuestionOptions: [],
				sociedadId: null,
				usuarioId: null,
				operacionId: null,
				fechaId: null
			}
		});
		this.props.closeQuestion();
	}

	setQuestion(name) {
		let question = this.state.squestion;
		question.question = name;
		this.setState({squestion: question});
	}

	setRequired(value) {
		console.log(value);
		let question = this.state.squestion;
		if (value === true)
			question.required = 1;
		else
			question.required = 0;
		this.setState({squestion: question});
	}

	componentWillMount() {
		if (this.props !== undefined && this.props.question != null) {
			let question = this.props.question;
			this.setState({squestion: question});
			if (question.type != null && question.type.codigoSap === Constants.CODSAP_FREE_ANSWER) {
				this.setState({selectedValidation: question.lsQuestionOptions[0]});
			}
		}
		console.log(this.props.question);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== undefined && nextProps.question != null) {
			let question = nextProps.question;
			this.setState((prevState, props) => ({
				squestion: question
			}));
			if (question.type != null && question.type.codigoSap === Constants.CODSAP_FREE_ANSWER) {
				this.setState({selectedValidation: question.lsQuestionOptions[0]});
			}
		}
	}

	render() {
		let innerComponent;
		if (this.state.squestion.type != null) {
			switch (this.state.squestion.type.codigoSap) {
				case Constants.CODSAP_MULTIPLE_OPTION:
					innerComponent = <MultipleOption lsOptions={this.state.squestion.lsQuestionOptions}
					                                 questions={this.props.questions}
					                                 addOption={this.addOption}
					                                 updateOption={this.updateOption}
					                                 removeOption={this.removeOption}
					                                 readOnly={this.props.readOnly}
					                                 addQuestion={this.addQuestion}
					                                 handleClose={this.handleClose}
					                                 assigned={this.props.assigned}
					                                 showError={this.showError}
					                                 user={this.props.user}
					/>;
					break;
				case Constants.CODSAP_MULTIPLE_SELECTION:
					innerComponent = <MultipleSelection lsOptions={this.state.squestion.lsQuestionOptions}
					                                    questions={this.props.questions}
					                                    addOption={this.addOption}
					                                    updateOption={this.updateOption}
					                                    removeOption={this.removeOption}
					                                    readOnly={this.props.readOnly}
					                                    addQuestion={this.addQuestion}
					                                    handleClose={this.handleClose}
					                                    assigned={this.props.assigned}
					                                    showError={this.showError}
					                                    user={this.props.user}
					/>;
					break;
				case Constants.CODSAP_FREE_ANSWER:
					innerComponent = <FreeAnswer
						updateOption={this.updateOption}
						readOnly={this.props.readOnly}
						lsOptions={this.state.squestion.lsQuestionOptions}
						addQuestion={this.addQuestion}
						handleClose={this.handleClose}
						user={this.props.user}
						addOption={this.addOption}/>;
					break;
				case Constants.CODSAP_RANGE:
					innerComponent =
						<Range updateOption={this.updateOption}
						       lsOptions={this.state.squestion.lsQuestionOptions}
						       immutableQuestion={this.props.immutableQuestion}
						       readOnly={this.props.readOnly}
						       addQuestion={this.addQuestion}
						       handleClose={this.handleClose}
						       addOption={this.addOption}
						       showError={this.showError}
						       assigned={this.props.assigned}
						       user={this.props.user}/>;
					break;
				case Constants.CODSAP_IMAGE:
					innerComponent = <Image readOnly={this.props.readOnly}
					                        addQuestion={this.addQuestion}
					                        handleClose={this.handleClose}
					                        user={this.props.user}/>;
					break;
				default:
					innerComponent = null;
			}
		}

		return (
			<div>
				<Messages ref={(el) => this.messages = el} className="pi-times:before"></Messages>
				<div style={{padding: '20px', minHeight: '215px'}}>
					{
						this.props.readOnly ?
							<div>
								<p>{this.state.squestion.question}</p>
								<p>{this.state.squestion.type != null ? 'Tipo: ' + this.state.squestion.type.nombre : ''}</p>
								{innerComponent}
								<Button label="Cerrar" onClick={this.handleClose}/>
							</div>
							:
							<div>
								<div style={{marginBottom: '20px'}}>
									<div>
										<InputText id="float-input" placeholder="Pregunta" type="text" required
										           maxLength="255" size="40"
										           value={this.state.squestion.question}
										           onChange={(e) => this.setQuestion(e.target.value)}/>
									</div>
									<p></p>
									<div style={{marginLeft: '5px'}}>
										<label>Obligatorio: </label>
										<InputSwitch checked={this.state.squestion.required}
										             onChange={(e) => this.setRequired(e.value)} style={{}}/>
									</div>

									<p></p>
									{
										this.state.squestion.type != null && this.state.squestion.id != null ?
											<p>{'Tipo: ' + this.state.squestion.type.nombre}</p> :
											<Dropdown value={this.state.squestion.type}
											          options={this.props.questionTypes}
											          onChange={this.onTypeChange} style={{width: '300px'}}
											          placeholder="Seleccione un tipo"
											          optionLabel="nombre"/>
									}
									{innerComponent}
								</div>
								{
									this.state.squestion.type == null ?
										<Button label="Cerrar" onClick={this.handleClose}/> : null
								}
							</div>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: getUser(state)
});
export default connect(mapStateToProps, null)(Question);