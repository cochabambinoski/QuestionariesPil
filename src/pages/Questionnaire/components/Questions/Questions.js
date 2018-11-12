import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import './Questions.css';
import ModalContainer from "../../../../widgets/Modal/pages/modal";
import Modal from "../../../../widgets/Modal/components/modal";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import QuestionDependent from "../Question/QuestionDependent";

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
				this.props.showSuccess("Dependencias: ", "Ahora puede registrar dependencias");
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
		console.log("handleCloseDependent val", value);
		this.setState((prevState, props) => {
			const question = this.props.questions[prevState.currentIndex];
			if (value !== undefined)
				question.questionOption = value;
			this.props.assignDenpendentQuestion(prevState.currentIndex, question);
			console.log("handleCloseDependent", value, question);
		});
		this.setState({dependentOpen: false});
	};

	clickChild = () => {
		console.log('child');
	};

	renderDependent() {
		const questions = this.props.questions;
		return (
			<Dialog
				/*className="fullDialog"
				fullScreen*/
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
					<Button label="Guardar" icon="pi pi-check" onClick={() => this.clickChild()}
					        className="buttonBlue"/>
					<Button label="Cancelar" icon="pi pi-times"
					        onClick={(value) => this.handleCloseDependent(value)}
					        className="ui-button-secondary buttonSecundary"/>
				</DialogActions>
			</Dialog>
		);
	}

	render() {
		return (
			<div>
				<ModalContainer>
					<Modal open={this.state.open} title={"Eliminar pregunta"}
					       message={"Está seguro de eliminar la pregunta?"}
					       handleConfirm={this.handleRemove} handleCancel={this.closeModal}>
					</Modal>
					<Modal open={this.state.saveOpen} title={"Guardar cuestionario"}
					       message={"Para asignar dependencias debe guardar el cuestionario. \n ¿Está seguro que desea guardar este cuestionario ahora?"}
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
											(question.questionOption === null || question.questionOption === undefined)  ?
												<label className="independent">Independiente</label> :
												<label className="dependent">Dependiente</label>
										}
										<label
											className="required">{question.required == 1 ? 'Obligatorio' : ''}</label>
									</div>
									<div>
										{
											this.props.readOnly ?
												<Button label="Ver" onClick={() => {
													this.props.seeQuestion(index);
												}}/>
												:
												<span>
                                                    <Button label="Editar"
                                                            onClick={() => {
	                                                            this.handleEdit(index);
                                                            }} icon="pi pi-pencil" iconPos="right"/>
													<Button label="Eliminar"
													        onClick={() => {
														        this.openModal(index);
													        }}
													        icon="pi pi-trash"
													        iconPos="right"
													        className="ui-button-danger"/>
                                                    <Button label="Dependiente"
                                                            onClick={() => {
	                                                            this.handleOpenDependent(index, question);
                                                            }}
                                                            icon="pi pi-angle-double-down"
                                                            iconPos="right"
                                                            className="ui-button-success"/>
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