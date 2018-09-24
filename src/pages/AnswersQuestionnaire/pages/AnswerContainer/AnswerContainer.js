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
            showGraphics:false,
            answers:[],
        }
    }

    changeCurrentAnswer = currentAnswer => {
        this.setState({currentAnswer: currentAnswer})
    };

    showAnswersGraphics = (answers, questionarySelected) => {
        this.setState({answers: answers, showGraphics: true, questionarySelected: questionarySelected})
    };

    render() {
        return (
            <div>
                <Title tilte={'Encuestas respondidas'}
                       subtitle={'Aqui podra encontrar todas las encuestas respondidas por nuestros clientes.'}/>
                <br/>
                {
                    this.state.currentAnswer === null && this.state.answers.length <= 0 ?
                        <AnswerList changeCurrentAnswer={this.changeCurrentAnswer}
                        showAnswersGraphics={this.showAnswersGraphics}/> :
                        this.state.showGraphics === false ?
                            <AnswerDetail answer={this.state.currentAnswer}/> :
                            <GraphicsDetail answers={this.state.answers} questionarySelected={this.state.questionarySelected}/>
                }
            </div>
        );
    }
}

AnswerContainer.propTypes = {};

export default AnswerContainer;
