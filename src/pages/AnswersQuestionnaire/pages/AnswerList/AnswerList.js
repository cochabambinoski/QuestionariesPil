import React, {Component} from 'react';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import Constants from "../../../../Constants";
import {Col, Grid, Row} from "react-flexbox-grid";
import Questionary from "../../../AssignmentSeller/pages/QuestionaryAssigment";
import Title from "../../../Title/Title";
import ListItem from '@material-ui/core/ListItem';
import AnswerItem from "./components/AnswerItem";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class AnswerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionnaireSelected: null,
            questionnaireList: [],
            AnswerList: [],
            selectedIndex: null,
        }
    }

    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            this.setState({questionnaireList: data});
        })
    }

    handleSelectedQuestionary = idQuestionary => {
        this.setState({questionnaireSelected: idQuestionary})
    };

    handleListItemClick = (event, questionnaire) => {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ANSwERS + questionnaire.id)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            this.setState({AnswerList: data, questionnaireSelected: questionnaire,selectedIndex: questionnaire.id});
        })
    };

    render() {
        console.log(this.state.selectedIndex);
        console.log(this.state.AnswerList);
        return (
            <Grid fluid>
                <Row>
                    <Col xs md={6}>
                        <Title tilte={'Cuestionarios'}
                               subtitle={'Aqui podra seleccionar la encuesta de la cual quiera desee ver sus respuestas.'}/>
                        <br/>
                        <div>
                            {
                                this.state.questionnaireList.length > 0 ?
                                    <List style={{background: '#f3f4f9'}}>
                                        {
                                            this.state.questionnaireList.map(questionnaire => (
                                                <ListItem button
                                                          key={questionnaire.id}
                                                          selected={this.state.selectedIndex === questionnaire.id}
                                                          onClick={event => this.handleListItemClick(event, questionnaire)}>
                                                    <Questionary
                                                        style={{width: '100%', height: '100%', background: '#f3f4f9'}}
                                                        questionary={questionnaire}
                                                        parentComponent={AnswerList.name}
                                                        onSelectedQuestionaryClick={this.handleSelectedQuestionary}/>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    :
                                    null
                            }
                        </div>
                    </Col>
                    <Col xs md={6}>
                        <Title tilte={'Encuestas respondidas'}
                               subtitle={'Aqui podra encontrar todas las encuestas respondidas segun el cuestionario seleccionado.'}/>
                        <br/>
                        {
                            this.state.AnswerList.length > 0 ?
                                <List>
                                    {
                                        this.state.AnswerList.map(answer => (
                                            <AnswerItem answer={answer}
                                                         key={answer.id}/>
                                        ))
                                    }
                                </List>
                                :
                                null
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

AnswerList.propTypes = {};

export default withStyles(styles)(AnswerList);
