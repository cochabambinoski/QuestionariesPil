import React, {Component} from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Constants from "../../../../Constants";
import { Grid, Col, Row} from "react-flexbox-grid";
import Questionary from "../../../AssignmentSeller/pages/QuestionaryAssigment";
import Title from "../../../Title/Title";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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

    handleListItemClick = (event, index) => {
        console.log(index)
        this.setState({ selectedIndex: index });
    };

    render() {
        console.log(this.state.selectedIndex);
        return (
            <Grid fluid >
                <Row >
                    <Col xs md={6}>
                        <Title tilte={'Cuestionarios'}
                                    subtitle={'Aqui podra seleccionar la encuesta de la cual quiera desee ver sus respuestas.'}/>
                        <br/>
                            <div>
                            {
                                this.state.questionnaireList.length >0 ?
                                    <List component="nav">
                                        {
                                            this.state.questionnaireList.map(questionnaire => (
                                                <ListItem button
                                                    key={questionnaire.id}
                                                    selected={this.state.selectedIndex === questionnaire.id}
                                                    onClick={event => this.handleListItemClick(event, questionnaire.id)}>
                                                    <Questionary questionary={questionnaire}
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
                            this.state.AnswerList.length >0 ?
                                <List>
                                    {
                                        this.state.questionnaireList.map(questionnaire => (
                                            <Questionary questionary={questionnaire}
                                                         key={questionnaire.id}
                                                         parentComponent={AnswerList.name}
                                                         onSelectedQuestionaryClick={this.handleSelectedQuestionary}/>
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
