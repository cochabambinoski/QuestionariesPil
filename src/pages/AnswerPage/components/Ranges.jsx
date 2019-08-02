import React, {Component} from 'react';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import connect from "react-redux/es/connect/connect";
import Slider from '@material-ui/lab/Slider';
import {getMarkedOptions, getTriedToSave} from "../../../reducers";
import {updateMarkedOptions} from "../../../actions";

class FreeAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: parseInt(this.props.question.lsQuestionOptions[0].option, 10),
            max: parseInt(this.props.question.lsQuestionOptions[1].option, 10),
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
        if (selectedOptions !== undefined && selectedOptions.length !== 0 && selectedOptions[0].answerDetail !== this.state.min) {
            this.selectOption(this.state.min);
        }
    };

    createDetail = text => (
        {
            question: this.props.question.id,
            answerDetail: text,
        }
    );

    componentDidMount = () => {
        let markedOptions = {...this.props.markedOptions};
        const selectedOptions = markedOptions[this.props.question.id];
        if (selectedOptions === undefined) {
            this.selectOption(this.state.min);
        }
        const enabled = this.verifyPrecondition();
        this.setState({isEnabled: enabled});
    };

    componentWillReceiveProps = () => {
        const enabled = this.verifyPrecondition();
        this.setState({isEnabled: enabled});
    };

    render() {
        const markedOptions = this.props.markedOptions[this.props.question.id];
        let selectedOption = markedOptions === undefined || markedOptions.length === 0 ? undefined : markedOptions[0];
        return (
            <div>
                {
                    this.state.isEnabled ?
                        <div style={{marginBottom: '10px', marginTop: '30px', textAlign: 'center'}}>
                            <div style={{marginBottom: '20px'}}>
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

                            <div style={{fontSize: '2.5vh'}}>
                                <div style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '10px'}}>
                                    {this.state.min}
                                </div>
                                <div style={{width: '50vw', display: 'inline-block', verticalAlign: 'middle'}}>
                                    <Slider min={this.state.min} max={this.state.max} step={1}
                                            value={selectedOption !== undefined ? selectedOption.answerDetail : null}
                                            onChange={(event, value) => this.selectOption(value)}/>

                                </div>
                                <div style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px'}}>
                                    {this.state.max}
                                </div>

                                <div style={{marginTop: '15px'}}>
                                    {selectedOption !== undefined ? selectedOption.answerDetail : null}
                                </div>
                            </div>

                            <div style={{width: '50vh', margin: 'auto'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(FreeAnswer)
