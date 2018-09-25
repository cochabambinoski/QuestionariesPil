import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AnswerDetail from "../AnswerDetail/AnswerDetail";
import AnswerList from "../AnswerList/AnswerList";
import Title from "../../../Title/Title";
import GraphicsDetail from "../GraphicsDetail/GraphicsDetail";

class AnswerContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentComponent: AnswerList.constructor.name,
            questionarySelected: null,
            currentAnswer: null,
            showGraphics: false,
            answers: [],
        }
    }

    changeCurrentAnswer = currentAnswer => {
        this.setState({currentAnswer: currentAnswer})
    };

    showAnswersGraphics = (answers, questionarySelected) => {
        this.setState({answers: answers, showGraphics: true, questionarySelected: questionarySelected})
    };

    backAnswerList = () => {
        this.setState({answers: [], showGraphics: false, questionarySelected: null})
    };

    render() {
        console.log( this.state.showGraphics === false );
        return (
            <div>
                {
                    this.state.showGraphics === false ?
                        <Title tilte={'Encuestas respondidas'}
                               subtitle={'Presione una encuesta para ver los detalles de sus respuestas.'}/> :
                        <Title tilte={'Encuestas respondidas'}
                               subtitle={'Seleccione una pregunta para ver sus detalles.'}/>
                }
                <br/>
                {
                    this.state.currentAnswer === null && this.state.answers.length <= 0 ?
                        <AnswerList changeCurrentAnswer={this.changeCurrentAnswer}
                                    showAnswersGraphics={this.showAnswersGraphics}/> :
                        this.state.showGraphics === true ?
                            <GraphicsDetail answers={this.state.answers}
                                            questionarySelected={this.state.questionarySelected}
                                            backAnswerList={this.backAnswerList}/> : null
                }
            </div>
        );
    }
}

AnswerContainer.propTypes = {};

export default AnswerContainer;
