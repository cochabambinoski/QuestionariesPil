import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {RadioButton} from 'primereact/radiobutton';
import Constants from '../../../../Constants.json';
import {connect} from 'react-redux';
import {getUser} from "../../../../reducers";

const MultipleOption = (props) => (

    <div className="ui-g" style={{ width: '250px', marginBottom: '10px' }}>
        {
            props.lsOptions.map((option, index) => {
                return (
                    <div className="ui-g-12">
                        <RadioButton value={option.option} checked={false} />
                        {
                            props.readOnly ?
                                <div>{option.option}</div> :
                                <span>
                                    <InputText value={option.option} onChange={(e) => props.updateOption(e, index)} />
                                    <Button icon="pi pi-minus" onClick={() => { props.removeOption(index) }} />
                                </span>
                        }
                    </div>
                )
            })
        }

        {
            props.readOnly ? <div></div> :
                <Button label="Añadir opcion" onClick={props.addOption} className="ui-button-secondary" />}
    </div>
)

const MultipleSelection = (props) => (

    <div className="ui-g" style={{ width: '250px', marginBottom: '10px' }}>
        {
            props.lsOptions.map((option, index) => {
                return (
                    <div className="ui-g-12">
                        <Checkbox checked={false}></Checkbox>
                        {
                            props.readOnly ?
                                <div>{option.option}</div> :
                                <span>
                                    <InputText value={option.option} onChange={(e) => props.updateOption(e, index)} />
                                    <Button icon="pi pi-minus" onClick={() => { props.removeOption(index) }} />
                                </span>
                        }
                    </div>
                )
            })
        }

        {
            props.readOnly ? <div></div> :
                <Button label="Añadir opcion" onClick={props.addOption} className="ui-button-secondary" />}
    </div>
)
const FreeAnswer = (props) => (
    <div>
        {
            props.readOnly ?
                <div>{props.selectedValidation.option}</div> :
                <Dropdown value={props.selectedValidation.option} options={props.validationTypes} onChange={(e) => props.updateTypeOption(e.value, 0)} style={{ width: '300px' }} placeholder="Seleccione una validacion" optionLabel="option" />


        }
    </div>
);
const Range = (props) => (

    <div className="ui-g">
        <div className="ui-g-6">
            <div className="ui-g form-group">
                <div>
                    <div className="ui-g-6">
                        <label htmlFor="input">Minimo</label>
                    </div>
                    <div className="ui-g-6">
                        {
                            props.readOnly ? <div>{props.lsOptions[0].option}</div> : <InputText value={props.lsOptions[0].option} type="text" keyfilter="pnum" onChange={(e) => props.updateRangeOption(e.target, 0)} />
                        }

                    </div>
                </div>
                <div>
                    <div className="ui-g-6">
                        <label htmlFor="input">Maximo</label>
                    </div>
                    <div className="ui-g-6">
                        {
                            props.readOnly ? <div>{props.lsOptions[1].option}</div> : <InputText value={props.lsOptions[1].option} type="text" keyfilter="pnum" onChange={(e) => props.updateRangeOption(e.target, 1)} />
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
)

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            question: null,
            selectedType: null,
            selectedValidation: { option: 'Sin validacion' },
            lsOptions: [],
            userId: 'jarispe',
            sociedadId: "BO81",
            operacionId: 1,
            fechaId: null,
            required: 1,
            questionOption: null,
            received: true,
            squestion: {
                id: null,
                questionary: null,
                type: null,
                questionOption: null,
                question: null,
                required: 1,
                lsQuestionOptions: [],
                sociedadId: "BO81",
                usuarioId: null,
                operacionId: 1,
                fechaId: null,
            },
        };
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValidationTypeChange = this.onValidationTypeChange.bind(this);
        this.addOption = this.addOption.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.updateRangeOption = this.updateRangeOption.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.updateTypeOption = this.updateTypeOption.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    onTypeChange(e) {
        let question = this.state.squestion;
        if (e.value.codigoSap === Constants.CODSAP_FREE_ANSWER) {
            question.lsQuestionOptions = [{ option: 'Sin validacion' }];
        } else {
            question.lsQuestionOptions = [];
        }
        question.type = e.value;
        this.setState({ squestion: question });
        this.setState({ selectedType: e.value });
    }
    onValidationTypeChange(e) {
        this.setState({ selectedValidation: e.value });
        let auxQuestion = this.state.squestion;
        auxQuestion.lsQuestionOptions[0].option = e.value;
        this.setState({ squestion: auxQuestion });
    }
    addOption() {
        let auxQuestion = this.state.squestion;
        let newOption = {
            "id": null,
            "question": null,
            "option": "Opcion"
        }
        auxQuestion.lsQuestionOptions.push(newOption);
        this.setState({ squestion: auxQuestion });
    }
    updateOption(value, index) {
        let auxQuestion = this.state.squestion;
        auxQuestion.lsQuestionOptions[index].option = value.target.value;
        this.setState({ squestion: auxQuestion });
    }
    showError(summary, detail) {
        this.growl.show({ severity: 'error', summary: summary, detail: detail });
    }
    removeOption(index) {
        if (this.props.asigned)
            this.showError("No se pueden eliminar opciones de un cuestionario asignado");
        else {
            let auxQuestion = this.state.squestion;
            auxQuestion.lsQuestionOptions.splice(index, 1);
            this.setState({ squestion: auxQuestion });
        }
    }
    updateRangeOption(value, index) {
        let auxQuestion = this.state.squestion;
        let newOption = {
            "id": null,
            "question": null,
            "option": value.value
        }
        if (index >= auxQuestion.lsQuestionOptions.length)
            auxQuestion.lsQuestionOptions.push(newOption);
        else
            auxQuestion.lsQuestionOptions[index].option = value.value;
        this.setState({ squestion: auxQuestion });
    }
    updateTypeOption(value, index) {
        let auxQuestion = this.state.squestion;
        if (index >= auxQuestion.lsQuestionOptions.length)
            auxQuestion.lsQuestionOptions.push(value);
        else
            auxQuestion.lsQuestionOptions[index] = value;
        this.setState({ squestion: auxQuestion });
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
            sociedadId: this.state.squestion.sociedadId,
            usuarioId: this.props.user.username,
            operacionId: this.state.squestion.operacionId,
            fechaId: this.state.squestion.fechaId,
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
                required: 1,
                lsQuestionOptions: [],
                sociedadId: null,
                usuarioId: null,
                operacionId: null,
                fechaId: null,
            }
        });
        this.props.closeQuestion();
    }
    setQuestion(name) {
        let question = this.state.squestion;
        question.question = name;
        this.setState({ squestion: question });
    }
    showOptions() {

    }
    render() {
        const validationTypes = [
            { option: 'Sin validacion' },
            { option: 'Texto' },
            { option: 'Numero' },
            { option: 'Decimal' }
        ];
        console.log(this.props.question.type + "Recibiendo Pregunta Test 1")
        if (this.props !== undefined && this.props.question != null && this.props.question.id !== this.state.squestion.id) {
            console.log("props: " + JSON.stringify(this.props));
            let question = this.props.question;
            
            if (question != null) {
                console.log("selected question inside: " + JSON.stringify(question));
                this.setState({ squestion: question });
                this.setState({ questionnaireId: question.id });
                this.setState({ selectedType: question.type });
                this.setState({ id: question.id });
                this.setState({ question: question.question });
                this.setState({ required: question.required });
                this.setState({ lsOptions: question.lsQuestionOptions });
                this.setState({ questionOption: question.questionOption });
                this.setState({ sociedadId: question.sociedadId });
                this.setState({ userId: this.props.user.username });
                this.setState({ operacionId: question.operacionId });
                this.setState({ fechaId: question.fechaId });
                if (question.type!= null && question.type.codigoSap === Constants.CODSAP_FREE_ANSWER) {
                    this.setState({ selectedValidation: question.lsQuestionOptions[0] });
                }
            }
        }

        let innerComponent = null;
        console.log("read only inner components: " + this.props.readOnly);
        if (this.state.selectedType != null) {
            switch (this.state.selectedType.codigoSap) {
                case Constants.CODSAP_MULTIPLE_OPTION:
                    innerComponent = <MultipleOption lsOptions={this.state.squestion.lsQuestionOptions} addOption={this.addOption}
                        updateOption={this.updateOption} removeOption={this.removeOption} readOnly={this.props.readOnly}
                    />
                    break;
                case Constants.CODSAP_MULTIPLE_SELECTION:
                    innerComponent = <MultipleSelection lsOptions={this.state.squestion.lsQuestionOptions} addOption={this.addOption}
                        updateOption={this.updateOption} removeOption={this.removeOption} readOnly={this.props.readOnly}
                    />
                    break;
                case Constants.CODSAP_FREE_ANSWER:
                    innerComponent = <FreeAnswer selectedValidation={this.state.selectedValidation}
                        validationTypes={validationTypes} onValidationTypeChange={this.onValidationTypeChange}
                        updateTypeOption={this.updateTypeOption} readOnly={this.props.readOnly}
                        lsOptions={this.state.squestion.lsQuestionOptions} />
                    break;
                case Constants.CODSAP_RANGE:
                    innerComponent = <Range updateRangeOption={this.updateRangeOption} lsOptions={this.state.squestion.lsQuestionOptions}
                        readOnly={this.props.readOnly} />
                    break;
            }
        }

        return (
            <div>
                <div className="card card-w-title">
                    <h1>Pregunta</h1>
                    {
                        this.props.readOnly ?
                            <div>
                                <p>{'Pregunta: ' + this.state.squestion.question}</p>
                                <p>{this.state.squestion.type != null ? 'Tipo: ' + this.state.squestion.type.nombre : ''}</p>
                                {innerComponent}
                            </div>
                            :
                            <div>
                                <div className="ui-g form-group">
                                    <div className="card card-w-title">
                                        <InputText id="float-input" placeholder="Pregunta" type="text" required maxLength="255" size="52" value={this.state.squestion.question} onChange={(e) => this.setQuestion(e.target.value)} />
                                    </div>
                                </div>

                                {console.log("selected type: " + JSON.stringify(this.state.squestion.type))}
                                {console.log("selected type: " + JSON.stringify(this.state.selectedType))}
                                {
                                    this.props.asigned ?
                                        <p>{'Tipo: ' + this.state.selectedType}</p> :
                                        <Dropdown value={this.state.selectedType} options={this.props.questionTypes} onChange={this.onTypeChange} style={{ width: '300px' }} placeholder="Seleccione un tipo" optionLabel="nombre" />
                                }

                                {innerComponent}

                                <span>
                                    <Button label="Aceptar" onClick={this.addQuestion} />
                                    <Button label="Cancelar" onClick={this.props.closeQuestion} className="ui-button-danger" />
                                </span>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
});

export default connect(mapStateToProps, null)(Question);