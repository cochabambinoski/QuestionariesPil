import React, {Component} from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import connect from "react-redux/es/connect/connect";
import {Checkbox} from 'primereact/checkbox';
import {getMarkedOptions, getTriedToSave} from "../../../reducers";
import {updateMarkedOptions} from "../../../actions";

class MultipleSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: true,
        };
    }

    selectOption = e => {
        const answerDetail = {
            question: this.props.question.id,
            answerDetail: e.value.option,
        };
        let markedOptions = {...this.props.markedOptions};
        let selectedOptions = markedOptions[this.props.question.id];
        if (selectedOptions === null || selectedOptions === undefined) selectedOptions = [];
        if (e.checked)
            selectedOptions.push(answerDetail);
        else {
            selectedOptions.splice(this.getDetailIndexByOption(selectedOptions, e.value), 1);
        }
        markedOptions[this.props.question.id] = selectedOptions;
        this.props.updateMarkedOptions({id: this.props.question.id, value: selectedOptions});
    };

    getDetailIndexByOption = (list, option) => {
        let i = -1;
        list.forEach((detail, index) => {
            if (detail.answerDetail === option.option) {
                i = index;
            }
        });
        return i;
    };

    clean = () => {
        let markedOptions = {...this.props.markedOptions};
        const selectedOptions = markedOptions[this.props.question.id];
        if (selectedOptions !== undefined && selectedOptions.length !== 0) {
            markedOptions[this.props.question.id] = [];
            this.props.updateMarkedOptions({id: this.props.question.id, value: []});
        }
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

    componentDidMount = () => {
        const enabled = this.verifyPrecondition();
        this.setState((previousState, props) => {
            return {...previousState, isEnabled: enabled};
        });
    };

    componentWillReceiveProps = (nextProps) => {
        const enabled = this.verifyPrecondition();
        this.setState((previousState, props) => {
            return {...previousState, isEnabled: enabled};
        });
    };

    render() {
        const markedOptions = this.props.markedOptions[this.props.question.id];
        return (
            <div>
                {
                    this.state.isEnabled ?
                        <div>
                            <div style={{marginTop: '20px', textAlign: 'center'}}>
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
                            <div style={{width: '50vh', margin: 'auto'}}>
                                {
                                    this.props.question.lsQuestionOptions.map((option, index) => {
                                        const inasd = markedOptions === undefined ? undefined : this.getDetailIndexByOption(markedOptions, option);
                                        const selectedOption = markedOptions === undefined ? undefined : markedOptions[inasd];
                                        return (
                                            <div style={{
                                                paddingTop: '20px',
                                                fontFamily: 'Montserrat',
                                                fontSize: '20px',
                                                color: '#5a3115'
                                            }}>
                                                <Checkbox value={option} onChange={this.selectOption}
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
                                    && (markedOptions === undefined || (markedOptions !== undefined && markedOptions.length === 0)) ?
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

export default connect(mapStateToProps, mapDispatchToProps)(MultipleSelection)