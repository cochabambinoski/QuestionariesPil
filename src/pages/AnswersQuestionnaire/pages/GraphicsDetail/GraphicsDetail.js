import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Graphics from "../Graphics/Graphics";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import GoogleMapsComponent from "../../../../components/GoogleMaps/GoogleMapsComponent";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

class GraphicsDetail extends Component {
    state = {
        value: 0,
        currentQuestion: null,
        listAnswerCurrent: [],
        expandFirstSellerSearch: false,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    generateListAnswerQuestion(idQuestion) {
        let listAnswersQuestion = [];
        this.props.answers.forEach((answers) => {
            answers.lsAnswerDetails.forEach((answerDetail) => {
                if (answerDetail.question.id === idQuestion && !listAnswersQuestion.includes(answerDetail)) {
                    listAnswersQuestion.push(answerDetail);
                    return false;
                }
            })
        });
        return listAnswersQuestion
    }

    generateGraphics(question) {
        this.setState({currentQuestion: question, listAnswerCurrent: this.generateListAnswerQuestion(question.id)});
    }

    handleSetStateFirstSellerSearch = () => {
        const isExpanded = this.state.expandFirstSellerSearch;
        if (isExpanded) {
            this.setState({expandFirstSellerSearch: false});
        } else {
            this.setState({expandFirstSellerSearch: true});
        }
    };


    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (
            <div>
                <ExpansionPanel expanded={this.state.expandFirstSellerSearch}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {this.handleSetStateFirstSellerSearch()}}/>}>
                        <IconButton aria-label="Comments" onClick={() => this.props.backAnswerList()}>
                            <ArrowBack/>
                        </IconButton>
                        <ExpansionPanelDetails>
                                <Tabs position="static" color="default"
                                      indicatorColor="primary"
                                      textColor="primary"
                                      scrollable
                                      scrollButtons="auto"
                                      style={{marginRight: 10, padding: 0}}
                                    value={value} onChange={this.handleChange} showLabels className={classes.root}>
                                    {
                                        this.props.questionarySelected.lsQuestions.map((question) => {
                                            return <Tab  label={question.question} key={question.id}
                                                                           onClick={() => {
                                                                               this.generateGraphics(question)
                                                                           }}/>
                                        })
                                    }
                                </Tabs>
                        </ExpansionPanelDetails>
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