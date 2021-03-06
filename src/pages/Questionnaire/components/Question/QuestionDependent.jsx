import React, {Component} from 'react';
import {Dropdown} from "primereact/dropdown";
import {Messages} from "primereact/messages";
import Constants from './../../../../Constants';
import Button from "@material-ui/core/Button";
import {blue} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/es/styles/withStyles";
import Remove from '@material-ui/icons/Remove'

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

class QuestionDependent extends Component {

	constructor(props) {
		super(props);
		const questionsList = this.props.questions.filter(q => {
			if (q.type.codigoSap === Constants.CODSAP_MULTIPLE_OPTION || q.type.codigoSap === Constants.CODSAP_MULTIPLE_SELECTION) {
				return q;
			}
		});
		this.state = {
			LsQuestions: questionsList,
			selQuestion: {question: null},
			lsOptions: [],
			selOption: null,
			question: this.props.currentQuestion
		};

        this.onQuestionChange = this.onQuestionChange.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.showError = this.showError.bind(this);
    }

	componentDidMount() {
		this.findSelected(this.props);
		this.props.setDependentClick(this.handleSaveDependent);
	}

    componentWillReceiveProps = (nextProps) => {
        this.onQuestionChange.bind(nextProps.questions);
    };

	findSelected(thisProps) {
		const option = thisProps.currentQuestion.questionOption;
		if (option !== null) {
			thisProps.questions.forEach(q => {
				q.lsQuestionOptions.find(o => {
					if (o.id === option.id) {
						this.setState((prevState, props) => ({
							selQuestion: q,
							lsOptions: q.lsQuestionOptions,
							selOption: o
						}));
					}
				});
			});
		}
	}

    showError(summary, detail) {
        this.messages.show({severity: 'error', summary: summary, detail: detail});
    }

    questionTemplate(option) {
        if (!option.value) {
            return option.question;
        } else {
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.question}</span>
                </div>
            );
        }
    }

    onQuestionChange(e) {
        if (e.value === undefined || e.value === null) {
            e.value = null;
        } else {
            this.setState({lsOptions: e.value.lsQuestionOptions});
        }
        if (e.value.id !== this.props.currentQuestion.id) {
            this.setState({selQuestion: e.value});
        } else {
            this.showError("Cuidado", "No puede seleccionar la misma pregunta como referencia");
            this.setState({selQuestion: null});
        }
    }

    optionTemplate(option) {
        if (!option.value) {
            return option.option;
        } else {
            return (
                <div className="p-clearfix">
                    <span style={{float: 'right', margin: '.5em .5em 0 0'}}>{option.option}</span>
                </div>
            );
        }
    }

	onOptionChange(e) {
		if (e.value === undefined || e.value === null) {
			e.value = null;
		}
		const emptyOptions = this.props.questions.find((q) => {
			if (q.questionOption !== null)
				return q.questionOption.id === e.value.id;
		});
		if (emptyOptions === null || emptyOptions === undefined) {
			e.value.question = null;
			this.setState({selOption: e.value});
		}
		else {
			this.setState({selOption: null});
			this.showError('Alerta!', 'La opcion ya esta asiganada a otra pregunta');
		}
	}

	handleSaveDependent = (value) => {
		this.props.refresh(this.state.selOption);
	};

    render() {
        return (
            <div>
                <Messages ref={(el) => this.messages = el} className="pi-times:before"/>
                <div>
                    <h3>
                        Debe asignar una opci??n de alguna pregunta de la encuesta
                    </h3>
                    <p>Si la opci??n esta vacia la pregunta no tendra dependencia</p>
                </div>
                <div className="contentDropbox">
                    <Dropdown
                        value={this.state.selQuestion}
                        options={this.state.LsQuestions}
                        onChange={this.onQuestionChange}
                        itemTemplate={this.questionTemplate}
                        placeholder="Seleccione Pregunta"
                        optionLabel="question"
                        filter={true}
                        filterPlaceholder="Nombre de pregunta"
                        filterBy="question"
                        className="dropboxQuestion"
                        showClear={true}/>
                </div>
                <div className="contentDropbox">
                    <Dropdown
                        value={this.state.selOption}
                        options={this.state.lsOptions}
                        onChange={this.onOptionChange}
                        itemTemplate={this.optionTemplate}
                        placeholder="Seleccione Opci??n de Pregunta"
                        optionLabel="option"
                        filter={true}
                        filterPlaceholder="Nombre de Opci??n"
                        filterBy="option"
                        className="dropboxQuestion"
                        showClear={true}/>
                    <BlueButtonMinus onClick={() => {
                        this.setState({selOption: null});
                    }}>
                        <Remove/>
                    </BlueButtonMinus>
                </div>

            </div>
        );
    }
}

QuestionDependent.propTypes = {};

export default QuestionDependent;
