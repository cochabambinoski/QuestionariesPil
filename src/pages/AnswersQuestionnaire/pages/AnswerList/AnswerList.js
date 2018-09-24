import React, {Component} from 'react';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import Constants from "../../../../Constants";
import {Col, Grid, Row} from "react-flexbox-grid";
import Questionary from "../../../AssignmentSeller/pages/QuestionaryAssigment";
import Title from "../../../Title/Title";
import ListItem from '@material-ui/core/ListItem';
import AnswerItem from "./components/AnswerItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {Button} from "../../../../../node_modules/primereact/button";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import QuestionaryData
    from "../../../AssignmentSeller/pages/QuestionaryAssigment/components/QuestionaryData/QuestionaryData";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 400,
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
            this.setState({questionnaireList: data});
        })
    }

    handleSelectedQuestionary = idQuestionary => {
        this.setState({questionnaireSelected: idQuestionary})
    };

    showGraphic(){
        console.log("showGraphic")
    }


    handleListItemClick = (event, questionnaire) => {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ANSwERS + questionnaire.id)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({AnswerList: data, questionnaireSelected: questionnaire, selectedIndex: questionnaire.id});
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid fluid className='nomargin'>
                <Row className='nomargin'>
                    <Col className='nomargin' xs md={6}>
                        <Title tilte={'Encuestas'}
                               subtitle={'Aqui podra seleccionar la encuesta de la cual deseas ver el detalle de sus respuetas.'}/>
                        <br/>
                        <div  className="itemList">
                            {
                                this.state.questionnaireList.length > 0 ?
                                    <List>
                                        {
                                            this.state.questionnaireList.map(questionnaire => (
                                                <ListItem button
                                                          key={questionnaire.id}
                                                          selected={this.state.selectedIndex === questionnaire.id}
                                                          onClick={event => this.handleListItemClick(event, questionnaire)}>
                                                    <QuestionaryData
                                                        data={questionnaire}
                                                        parentComponent={AnswerList.name}
                                                        handleQuestionaryDataClick={this.showGraphic}/>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    :
                                    null
                            }
                        </div>
                    </Col>
                    <Col className='nomargin' xs md={6}>
                        <Title tilte={'Respondido por:'}
                               subtitle={'Aqui podra encontrar a todas las personas que respondieron las encuestas seleccionado.'}/>
                        <br/>
                        {
                            this.state.AnswerList.length > 0 ?
                                <div>
                                    <Button label="Mostrar Graficos" onClick={() => {this.props.showAnswersGraphics(this.state.AnswerList, this.state.questionnaireSelected)}} />
                                    <div  className="itemList">
                                        <List >
                                            {
                                                this.state.AnswerList.map(answer => (
                                                    <ListItem  button
                                                               onClick={event => this.props.changeCurrentAnswer(answer)}
                                                               key={answer.id}>
                                                        <ListItemText primary={"Respuesta # " + answer.id} />
                                                        {
                                                            answer.interviewedName ?
                                                                <ListItemText primary={answer.interviewedName}/> :
                                                                <ListItemText primary={answer.mobileClient.cliente.nombreFactura}/>

                                                        }
                                                        <Button label="Ver Detalle"/>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </div>
                                </div>
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
