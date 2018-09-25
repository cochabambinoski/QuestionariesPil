import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Constants from "../../../../Constants";
import {Grid} from "react-flexbox-grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Assignment from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import PieChart from '@material-ui/icons/PieChart';
import Banner from "../../../../components/Banner/Banner";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
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
            //this.setState({AnswerList: data, questionnaireSelected: questionnaire, selectedIndex: questionnaire.id});
            this.props.showAnswersGraphics(data, questionnaire)
        })
    };

    showAnswerGraphics(questionary){
        this.props.showAnswersGraphics(this.state.AnswerList, questionary)
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid fluid className='nomargin'>


                        <Banner tilte={'Encuestas'}
                               subtitle={'Aqui podra seleccionar la encuesta de la cual deseas ver el detalle de sus respuetas.'}/>
                        <br/>
                        <div  className="itemList">
                            {
                                this.state.questionnaireList.length > 0 ?
                                    <List className={classes.root} subheader={<li />}>
                                        {
                                            this.state.questionnaireList.map(questionnaire => (
                                                <ListItem button
                                                          key={questionnaire.id}
                                                          selected={this.state.selectedIndex === questionnaire.id}
                                                          onClick={event => this.handleListItemClick(event, questionnaire)}>
                                                    <Avatar>
                                                        <Assignment />
                                                    </Avatar>
                                                    <ListItemText primary="Nombre" secondary={questionnaire.name} />
                                                    <ListItemText primary="Creado" secondary={questionnaire.fechaId} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Comments" onClick={() => this.showAnswerGraphics(questionnaire)} >
                                                            <PieChart />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    :
                                    null
                            }
                        </div>


            </Grid>
        );
    }
}

AnswerList.propTypes = {};

export default withStyles(styles)(AnswerList);
