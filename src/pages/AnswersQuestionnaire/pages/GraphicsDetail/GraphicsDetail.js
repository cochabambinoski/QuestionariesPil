import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Graphics from "../Graphics/Graphics";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import GoogleMapsComponent from "../../../../components/GoogleMaps/GoogleMapsComponent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.paper,
    },
    margin: 0,
    padding: 0,
});

function generateListAnswers(idQuestion, listAnswers) {
    let listAnswersQuestion = [];
    listAnswers.forEach((answers) => {
        answers.lsAnswerDetails.forEach((answerDetail) => {
            if (answerDetail.question.id === idQuestion && !listAnswersQuestion.includes(answerDetail)) {
                listAnswersQuestion.push(answerDetail);
                console.log("includes");
                return false;
            }
        })
    });
    return listAnswersQuestion
}

class GraphicsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            currentQuestion: props.questionarySelected.lsQuestions[0],
            listAnswerCurrent: generateListAnswers(props.questionarySelected.lsQuestions[0].id, props.answers),
            expandFirstSellerSearch: false,
        };
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    generateGraphics = (question) => {
        this.setState({
            currentQuestion: question,
            listAnswerCurrent: generateListAnswers(question.id, this.props.answers)
        });
    };

    handleSetStateFirstSellerSearch = () => {
        const isExpanded = this.state.expandFirstSellerSearch;
        if (isExpanded) {
            this.setState({expandFirstSellerSearch: false});
        } else {
            this.setState({expandFirstSellerSearch: true});
        }
    };


    render() {
        const {value} = this.state;
        return (
            <div>
                <ExpansionPanel expanded={this.state.expandFirstSellerSearch}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={() => {
                            this.handleSetStateFirstSellerSearch()
                        }}/>}>
                        <IconButton aria-label="Comments" onClick={() => this.props.backAnswerList()}>
                            <ArrowBack/>
                        </IconButton>
                        <Tabs className='tabs-style'
                              position="static"
                              color="default"
                              indicatorColor="primary"
                              textColor="primary"
                              scrollable
                              scrollButtons="auto"
                              value={value} onChange={this.handleChange}>
                            {
                                this.props.questionarySelected.lsQuestions.map((question) => {
                                    return <Tab label={question.question} key={question.id}
                                                onClick={() => {
                                                    this.generateGraphics(question)
                                                }}/>
                                })
                            }
                        </Tabs>
                    </ExpansionPanelSummary>
                    <Divider/>
                    <GoogleMapsComponent answers={this.props.answers}/>
                </ExpansionPanel>
                {
                    <Graphics question={this.state.currentQuestion} listAnswerCurrent={this.state.listAnswerCurrent}/>
                }
            </div>
        );
    }
}

export default withStyles(styles)(GraphicsDetail);