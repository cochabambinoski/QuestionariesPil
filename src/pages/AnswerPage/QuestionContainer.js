import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Button} from 'primereact/button';
import {TIPPREG1, TIPPREG2, TIPPREG3, TIPPREG4} from "../AnswersQuestionnaire/pages/Graphics/typeQuestions";
import MultipleOption from "./components/MultipleOption";
import MultipleSelection from "./components/MultipleSelection";
import FreeAnswer from "./components/FreeAnswer";
import Ranges from "./components/Ranges";
import {getMarkedOptions} from "../../reducers";
import {ScrollPanel} from "primereact/scrollpanel";

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            questions: [],
        };
    }

    goBack = () => {
        this.props.handleMenuClick(this.props.index === 0 ? this.props.index : this.props.index - 1);
    };

    goForward = () => {
        this.props.handleMenuClick(this.props.index === this.props.structure.length - 1 ? this.props.index : this.props.index + 1);
    };

    questionOptionIsMarked = precondition => {
        const markedOptions = this.props.markedOptions[precondition.question.id];
        let option = null;
        if (markedOptions != null) {
            option = markedOptions.filter(detail => {
                return detail.answerDetail === precondition.option;
            })
        }
        return option !== null && option.length !== 0;
    };

    render() {
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <Button label="Anterior" onClick={this.goBack} style={{display: 'inline-block', margin: '15px'}}
                            className='brown-button'/>
                    <div style={{
                        display: 'inline-block',
                        margin: '15px',
                        fontFamily: 'Arnold',
                        fontSize: '20px',
                        color: '#412813'
                    }}>Pregunta {this.props.index + 1}</div>
                    <Button label="Siguiente" onClick={this.goForward} style={{display: 'inline-block', margin: '15px'}}
                            className='brown-button'/>
                </div>
                <ScrollPanel style={{width: '100%', height: '500px'}}>
                    <div>
                        {this.props.questions !== undefined ?
                            this.props.questions.map((question) => {
                                switch (question.type.codigoSap) {
                                    case TIPPREG1:
                                        return <MultipleOption question={question}
                                                               questionOptionIsMarked={this.questionOptionIsMarked}/>;
                                    case TIPPREG2:
                                        return <MultipleSelection question={question}
                                                                  questionOptionIsMarked={this.questionOptionIsMarked}/>;
                                    case TIPPREG3:
                                        return <FreeAnswer question={question}
                                                           questionOptionIsMarked={this.questionOptionIsMarked}/>;
                                    case TIPPREG4:
                                        return <Ranges question={question}
                                                       questionOptionIsMarked={this.questionOptionIsMarked}/>;
                                    default:
                                        return null;
                                }
                            })
                            : null}
                    </div>
                </ScrollPanel>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    markedOptions: getMarkedOptions(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);