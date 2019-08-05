import React, {Component} from 'react';
import AnswerList from "../AnswerList/AnswerList";
import Title from "../../../Title/Title";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackBarContentView from "../../../../components/snackBarCustom/SnackBarContentView";

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
        if (answers.length === 0) this.handleClick();
        this.setState({answers: answers, showGraphics: true, questionarySelected: questionarySelected})
    };

    backAnswerList = () => {
        this.setState({answers: [], showGraphics: false, questionarySelected: null})
    };

    handleClick = () => {
        this.setState({open: true});
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <Title title={'Encuestas respondidas'}
                       subtitle={'Presione una encuesta para ver los detalles de sus respuestas.'}/>
                <br/>
                <AnswerList changeCurrentAnswer={this.changeCurrentAnswer}
                            showAnswersGraphics={this.showAnswersGraphics}
                            handleClick={this.handleClick}/>

                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.state.open}
                          autoHideDuration={6000} onClose={this.handleClose}>
                    <SnackBarContentView onClose={this.handleClose} variant="info"
                                         message="Esta encuesta no fue respondida."/>
                </Snackbar>
            </div>
        );
    }
}

AnswerContainer.propTypes = {};

export default AnswerContainer;
