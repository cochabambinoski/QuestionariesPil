import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import connect from "react-redux/es/connect/connect";
import {InputText} from 'primereact/inputtext';
import {getMarkedOptions, getTriedToSave} from "../../../reducers";
import {updateMarkedOptions} from "../../../actions";
import Constants from "./../../../Constants.json";

class FreeAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType: "pint",
            isEnabled: true,
        };
    }

    selectOption = value => {
        const selectedOptions = [this.createDetail(value)];
        let markedOptions = {...this.props.markedOptions};
        markedOptions[this.props.question.id] = selectedOptions;
        this.props.updateMarkedOptions({id: this.props.question.id, value: selectedOptions});
    };

    verifyPrecondition = () => {
        const option = this.props.question.questionOption;
        if (option === null || (option !== null && this.props.questionOptionIsMarked(option))) {
            return true;
        } else {
            this.clean();
            return false;
        }
    };

    clean = () => {
        let markedOptions = {...this.props.markedOptions};
        const selectedOptions = markedOptions[this.props.question.id];
        if (selectedOptions !== undefined && selectedOptions.length !== 0) {
            markedOptions[this.props.question.id] = [];
            this.props.updateMarkedOptions({id: this.props.question.id, value: []});
        }
    };

    createDetail = text => (
        {
            question: this.props.question.id,
            answerDetail: text,
        }
    );

    setInputValidation = () => {
        const validation = this.props.question.lsQuestionOptions[0].option;
        let filter = "null";
        switch (validation) {
            case Constants.TEXT_VALIDATION:
                filter = /^[a-z\_\s]+$/i;
                break;
            case Constants.NUMBER_VALIDATION:
                filter = "pint";
                break;
            case Constants.DECIMAL_VALIDATION:
                filter = "pnum";
                break;
            default:
                break;
        }
        this.setState({inputType: filter});
    };

    componentDidMount = () => {
        this.setInputValidation();
        const enabled = this.verifyPrecondition();
        this.setState({isEnabled: enabled});
    };

    componentWillReceiveProps = (nextProps) => {
        const enabled = this.verifyPrecondition();
        this.setState({isEnabled: enabled});
    };

    render() {
        const markedOptions = this.props.markedOptions[this.props.question.id];
        let selectedOption = markedOptions === undefined || markedOptions.length === 0 ? this.createDetail("") : markedOptions[0];
        return (
            <div>
                {
                    this.state.isEnabled ?
                        <div style={{textAlign: 'center'}}>
                            <div style={{
                                marginTop: '20px',
                            }}>
                                <div style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: 'bold',
                                    fontSize: '25px',
                                    color: '#412813',
                                    display: 'inline-block',
                                    marginRight: '15px',
                                }}>{this.props.question.question}</div>
                                {this.props.question.required === 1 ?
                                    <div className='required-label'>OBLIGATORIA</div> : null}
                            </div>
                            <InputText
                                ref="input"
                                placeholder="Respuesta"
                                maxLength="255"
                                style={{
                                    minWidth: '500px',
                                    background: '#FFF7A94D',
                                    color: '#412813',
                                    fontSize: '22px',
                                    border: '0',
                                    marginTop: '15px',
                                }}
                                value={selectedOption.answerDetail}
                                keyfilter={this.state.inputType}
                                onChange={(e) => this.selectOption(e.target.value)}
                                rows={4} autoResize={false}/>

                            <div style={{width: '50vh', margin: 'auto'}}>
                                {
                                    this.props.triedToSave && this.props.question.required === 1
                                    && (markedOptions === undefined ||
                                        (markedOptions !== undefined && markedOptions[0] === undefined) ||
                                        (markedOptions !== undefined && markedOptions[0].answerDetail === '')) ?
                                        <div className='unanswered-label'>PREGUNTA SIN RESPONDER</div> : null
                                }
                            </div>
                        </div> : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    markedOptions: getMarkedOptions(state),
    triedToSave: getTriedToSave(state),
});

const mapDispatchToProps = dispatch => ({
    updateMarkedOptions: value => dispatch(updateMarkedOptions(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreeAnswer)