import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import connect from "react-redux/es/connect/connect";
import {RadioButton} from 'primereact/radiobutton';
import {updateMarkedOptions} from "../../../actions";
import {getMarkedOptions, getTriedToSave} from "../../../reducers";

class MultipleOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: true,
        };
    }

    selectOption = option => {
        const answerDetail = {
            question: this.props.question.id,
            answerDetail: option.option,
        };
        const selectedOptions = [answerDetail];
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

    componentDidMount = () => {
        const enabled = this.verifyPrecondition();
        this.setState({isEnabled: enabled});
    };

    componentWillReceiveProps = (nextProps) => {
        const enabled = this.verifyPrecondition();
        this.setState({isEnabled: enabled});
    };

    render() {
        const markedOptions = this.props.markedOptions[this.props.question.id];
        const selectedOption = markedOptions === undefined ? undefined : markedOptions[0];
        return (
            <div>
                {
                    this.state.isEnabled ?
                        <div>
                            <div style={{textAlign: 'center'}}>
                                <div style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: 'bold',
                                    fontSize: '3vh',
                                    color: '#412813',
                                    display: 'inline-block',
                                    marginRight: '15px',
                                }}>{this.props.question.question}</div>
                                {this.props.question.required === 1 ?
                                    <div className='required-label'>OBLIGATORIA</div> : null}
                            </div>
                            <div style={{width: '50vh', margin: 'auto'}}>
                                {
                                    this.props.question.lsQuestionOptions.map((option, index) => {
                                        return (
                                            <div style={{
                                                paddingTop: '20px',
                                                fontFamily: 'Montserrat',
                                                fontSize: '2.5vh',
                                                color: '#5a3115',
                                            }}>
                                                <RadioButton value={option}
                                                             onChange={(e) => this.selectOption(option)}
                                                             style={{display: 'inline-block'}}
                                                             id='answerButton'
                                                             checked={selectedOption !== undefined && selectedOption.answerDetail === option.option}/>
                                                <div style={{
                                                    display: 'inline-block',
                                                    marginLeft: '20px'
                                                }}>{option.option}</div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    this.props.triedToSave && this.props.question.required === 1
                                    && (markedOptions === undefined ||
                                        (markedOptions !== undefined && markedOptions.length === 0)) ?
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

export default connect(mapStateToProps, mapDispatchToProps)(MultipleOption)
