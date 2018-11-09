import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";

class Range extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstMin: null,
			firstMax: null
		};
		this.addQuestion = this.addQuestion.bind(this);
		this.updateOption = this.updateOption.bind(this);
		this.validateFields = this.validateFields.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	validateFields() {
		let emptyOptions = this.props.lsOptions.filter((option) => (option.option === ""));
		if (emptyOptions.length === 0) {
			const min = parseInt(this.props.lsOptions[0].option, 10);
			const max = parseInt(this.props.lsOptions[1].option, 10);
			if (this.props.assigned && this.props.immutableQuestion !== null && this.props.immutableQuestion !== undefined) {
				const immutableOptions = this.props.immutableQuestion.lsQuestionOptions;
				const initialMin = parseInt(immutableOptions[0].option, 10);
				const initialMax = parseInt(immutableOptions[1].option, 10);
				if (initialMin !== null && initialMin < min) {
					this.props.showError("Cuestionario asignado", "No se puede cambiar el mínimo a más de " + initialMin);
					this.updateOption(this.state.firstMin, 0);
					return false;
				}
				if (initialMax !== null && initialMax > max) {
					this.props.showError("Cuestionario asignado", "No se puede cambiar el máximo a un valor menor a " + initialMax);
					this.updateOption(this.state.firstMax, 1);
					return false;
				}
			}
			if (min >= max) {
				this.props.showError("", "El maximo debe ser mayor al minimo");
				return false;
			} else {
				return true;
			}
		} else {
			this.props.showError("", "Añada rangos");
			return false;
		}
	}

	addQuestion() {
		if (this.validateFields())
			this.props.addQuestion();
	}

	updateOption(value, index) {
		this.props.updateOption(value, index);
	}

	handleClose() {
		if (this.state.firstMin !== null && this.state.firstMax !== null) {
			this.updateOption(this.state.firstMin, 0);
			this.updateOption(this.state.firstMax, 1);
			this.setState({firstMin: null});
			this.setState({firstMax: null});
		}
		this.props.handleClose();
	}

	componentWillMount() {
		if (this.props.lsOptions.length === 0) {
			this.props.addOption({
				option: '',
				sociedadId: 'BO81',
				usuarioId: this.props.user.username,
				operacionId: 1,
				fechaId: null
			});
			this.props.addOption({
				option: '',
				sociedadId: 'BO81',
				usuarioId: this.props.user.username,
				operacionId: 1,
				fechaId: null
			});
		} else {
			this.setState({firstMin: this.props.lsOptions[0].option});
			this.setState({firstMax: this.props.lsOptions[1].option});
		}
	}

	render() {
		return (
			<div style={{marginTop: '15px'}}>
				<div>
					<div>
						<div>
							{
								this.props.readOnly ? <div>Minimo: {this.props.lsOptions[0].option}</div> :
									<div style={{display: 'flex'}}>
										<div>
											<label htmlFor="input">Minimo</label>
										</div>
										<div>

											<InputText value={this.props.lsOptions[0].option} type="text"
											           keyfilter="pint" style={{width: '300px', marginLeft: '20px'}}
											           onChange={(e) => this.updateOption(e.target.value, 0)}/>
										</div>
									</div>
							}
							{
								this.props.readOnly ? <div>Maximo: {this.props.lsOptions[1].option}</div> :
									<div style={{display: 'flex'}}>
										<div>
											<label htmlFor="input">Maximo</label>
										</div>
										<div>

											<InputText value={this.props.lsOptions[1].option} type="text"
											           keyfilter="pint" style={{width: '300px', marginLeft: '20px'}}
											           onChange={(e) => this.updateOption(e.target.value, 1)}/>
										</div>
									</div>
							}
						</div>
					</div>
				</div>

				{
					this.props.readOnly ? <div/> :
						<div style={{marginTop: '20px'}}>
							<span>
                                <Button label="Aceptar" onClick={this.addQuestion}/>
                                <Button label="Cancelar" onClick={this.handleClose} className="ui-button-danger"/>
                            </span>
						</div>
				}
			</div>
		);
	}
}

export default Range;