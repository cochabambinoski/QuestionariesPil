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
import {connect} from 'react-redux';
import {getAnswers, getQuestionnarieAnswers} from "../../../../reducers";
import {getAnswersAnsQuestionnaireByQuestionnaire,} from "../../../../actions/indexthunk";
import Link from "react-router-dom/es/Link";
import Title from "../../../Title/Title";
import SwipeableViews from 'react-swipeable-views';

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
            listAnswerCurrent: null,
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

    getAnswers = () => {
        this.props.getAnswersAndQuestionnaireByIdQuestionnaire(this.props.idQuestionary)
    };

    componentDidMount(){
        this.getAnswers();
    }

    render() {
        const {value} = this.state;
        const { classes, theme } = this.props;
        return (
            <div>
                {
                    this.props.answerQuestionnaire ?
                        <div>
                            <Title tilte={'Detalles de la encuesta'}
                                   subtitle={'Presione una pregunta para ver los detalles de la pregunta.'}/>
                            <br/>
                            <ExpansionPanel expanded={this.state.expandFirstSellerSearch}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon onClick={() => {
                                        this.handleSetStateFirstSellerSearch()
                                    }}/>}>
                                    <Link to={`/Answers`}>
                                        <IconButton aria-label="Comments">
                                            <ArrowBack/>
                                        </IconButton>
                                    </Link>

                                    <Tabs className='tabs-style'
                                          position="static"
                                          color="default"
                                          indicatorColor="primary"
                                          textColor="primary"
                                          scrollable
                                          scrollButtons="auto"
                                          value={value} onChange={this.handleChange}>
                                        {
                                            this.props.answerQuestionnaire.lsQuestions.map((question) => {
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
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}>
                                {
                                    this.props.answerQuestionnaire.lsQuestions.map((question) => {
                                        return <Graphics question={question} listAnswerCurrent={generateListAnswers(question.id, this.props.answers)}/>
                                    })
                                }
                            </SwipeableViews>

                        </div> : <h1> Cargando... </h1>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    answers: getAnswers(state),
    answerQuestionnaire: getQuestionnarieAnswers(state),
});

const mapDispatchToProps = dispatch => ({
    getAnswersAndQuestionnaireByIdQuestionnaire: value => dispatch(getAnswersAnsQuestionnaireByQuestionnaire(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(GraphicsDetail));