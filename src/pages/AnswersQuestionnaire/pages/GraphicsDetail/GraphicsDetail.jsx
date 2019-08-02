import React, {Component, Fragment} from 'react';
import Title from "../../../Title/Title";
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBack from "@material-ui/icons/ArrowBack";
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Graphics from "../Graphics/Graphics";
import {connect} from 'react-redux';
import Link from "react-router-dom/es/Link";
import SwipeableViews from 'react-swipeable-views';
import {getQuestionnarieAnswers} from "../../../../reducers";
import {getAnswersAnsQuestionnaireByQuestionnaire,} from "../../../../actions/indexthunk";
import {answersRoute} from "../../../../routes/PathRoutes";
import {cleanCurrentAnswer} from "../../../../actions";
import GoogleMapsClient from "../../../../components/googleMapsClient/GoogleMapsClient";
import './style.scss';

const styles = theme => ({
    root: {
        flexGrow: 1, margin: 0, padding: 0, backgroundColor: theme.palette.background.paper,
    },
    margin: 0,
    padding: 0,
});

class GraphicsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 0, listAnswerCurrent: null, expandFirstSellerSearch: false,};
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    generateGraphics = (question) => {
        this.setState({currentQuestion: question,});
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

    componentDidMount() {
        this.getAnswers();
    }

    componentWillUnmount() {
        this.props.cleanCurrentAnswer()
    }

    render() {
        const {value, expandFirstSellerSearch} = this.state;
        const {theme, answerQuestionnaire, idQuestionary} = this.props;
        return (
            <Fragment>
                {answerQuestionnaire ?
                    <div>
                        <Title title={'Detalles de la encuesta'}
                               subtitle={'Presione una pregunta para ver los detalles de la pregunta.'}/>
                        <br/>
                        <ExpansionPanel expanded={expandFirstSellerSearch}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                                this.handleSetStateFirstSellerSearch()
                            }}/>}>
                                <Link to={answersRoute}>
                                    <IconButton aria-label="Comments">
                                        <ArrowBack/>
                                    </IconButton>
                                </Link>
                                <Tabs className='tabs-style' position="static" color="default" indicatorColor="primary"
                                      textColor="primary" scrollable scrollButtons="auto" value={value}
                                      onChange={this.handleChange}>
                                    {answerQuestionnaire.lsQuestions.map((question) => {
                                        return <Tab label={question.question} key={question.id} onClick={() => {
                                            this.generateGraphics(question)
                                        }}/>
                                    })}
                                </Tabs>
                            </ExpansionPanelSummary>
                            <Divider/>
                            <div>
                                <GoogleMapsClient idQuestionary={idQuestionary}/>
                            </div>
                        </ExpansionPanel>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}>
                            {answerQuestionnaire.lsQuestions.map((question) => {
                                return <Graphics question={question} key={question.id}/>
                            })}
                        </SwipeableViews>
                    </div> : <h1> Cargando... </h1>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    answerQuestionnaire: getQuestionnarieAnswers(state),
});

const mapDispatchToProps = dispatch => ({
    getAnswersAndQuestionnaireByIdQuestionnaire: value => dispatch(getAnswersAnsQuestionnaireByQuestionnaire(value)),
    cleanCurrentAnswer: () => dispatch(cleanCurrentAnswer())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(GraphicsDetail));
