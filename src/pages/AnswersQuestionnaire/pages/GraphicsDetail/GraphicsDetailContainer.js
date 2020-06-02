import React, {Component} from 'react';
import AnswerList from "../AnswerList/AnswerList";
import Title from "../../../Title/Title";
import GraphicsDetail from "../GraphicsDetail/GraphicsDetail";

class GraphicsDetailContainer extends Component {

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

    showAnswersGraphics = (answers, questionarySelected) => {
        if (answers.length === 0) this.handleClick();
        this.setState({answers: answers, showGraphics: true, questionarySelected: questionarySelected})
    };

    backAnswerList = () => {
        this.setState({answers: [], showGraphics: false, questionarySelected: null})
    };

    render() {
        return (
            <div>

                <Title title={'Encuestas respondidas'}
                       subtitle={'Seleccione una pregunta para ver sus detalles.'}/>

                <br/>
                <GraphicsDetail answers={this.state.answers}
                                questionarySelected={this.state.questionarySelected}
                                backAnswerList={this.backAnswerList}/>
            </div>
        );
    }
}

GraphicsDetailContainer.propTypes = {};

export default GraphicsDetailContainer;
