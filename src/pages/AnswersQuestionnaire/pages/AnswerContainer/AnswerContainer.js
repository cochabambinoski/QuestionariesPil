import React, {Component} from 'react';
import AnswerList from "../AnswerList/AnswerList";
import Title from "../../../Title/Title";
import GraphicsDetail from "../GraphicsDetail/GraphicsDetail";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackBarContentView from "../../../../components/SnackBarContent/SnackBarContentView";

class AnswerContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentComponent: AnswerList.constructor.name,
            questionarySelected: null,
            currentAnswer: null,
            showGraphics: false,
            answers: [],
            open: false,
        }
    }

    changeCurrentAnswer = currentAnswer => {
        this.setState({currentAnswer: currentAnswer})
    };

    showAnswersGraphics = (answers, questionarySelected) => {
        if (answers.length === 0)this.handleClick();
        this.setState({answers: answers, showGraphics: true, questionarySelected: questionarySelected})
    };

    backAnswerList = () => {
        this.setState({answers: [], showGraphics: false, questionarySelected: null})
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackBarContentView
                        onClose={this.handleClose}
                        variant="info"
                        message="Esta encuesta no fue respondida."
                    />
                </Snackbar>
            </div>
        );
    }
}

AnswerContainer.propTypes = {};

export default AnswerContainer;
