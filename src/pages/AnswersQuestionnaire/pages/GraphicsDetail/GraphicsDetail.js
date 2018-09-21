import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Graphics from "../Graphics/Graphics";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class GraphicsDetail extends Component {
    state = {
        value: 0,
        currentQuestion: null,
        listAnswerCurrent: [],
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    generateListAnswerQuestion(idQuestion){
        let listAnswersQuestion = [];
        this.props.answers.forEach((answers) => {
            answers.lsAnswerDetails.forEach((answerDetail) =>{
                if (answerDetail.question.id === idQuestion && !listAnswersQuestion.includes(answerDetail)){
                    listAnswersQuestion.push(answerDetail);
                    return false;
                }
            })
        });
        return listAnswersQuestion
    }

    generateGraphics(question){
        this.setState({currentQuestion: question, listAnswerCurrent: this.generateListAnswerQuestion(question.id)});
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div>


                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}>
                    {
                        this.props.questionarySelected.lsQuestions.map((question) => {
                            return  <BottomNavigationAction label={question.question} onClick={() => {this.generateGraphics(question)}} />
                        })
                    }
                </BottomNavigation>
                {
                    <Graphics question={this.state.currentQuestion} listAnswerCurrent={this.state.listAnswerCurrent}/>
                }
            </div>
        );
    }
}

export default withStyles(styles)(GraphicsDetail);