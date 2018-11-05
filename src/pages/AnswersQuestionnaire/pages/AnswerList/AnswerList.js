import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from "react-flexbox-grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Assignment from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import PieChart from '@material-ui/icons/PieChart';
import {getQuestionnaries} from "../../../../reducers";
import {fetchGetQuestionaries, getAnswersByQuestionnaire} from "../../../../actions/indexthunk";
import {connect} from 'react-redux';
import Link from "react-router-dom/es/Link";

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
        this.props.fetchGetQuestionaries();
    }

    handleSelectedQuestionary = idQuestionary => {
        this.setState({questionnaireSelected: idQuestionary})
    };

    showGraphic() {
        console.log("showGraphic")
    }


    handleListItemClick = (event, questionnaire) => {
        this.props.getAnswersByQuestionnaire(questionnaire.id)
            .then((data) => {
                this.props.showAnswersGraphics(data, questionnaire)
            });
    };

    showAnswerGraphics(questionary) {
        this.props.showAnswersGraphics(this.state.AnswerList, questionary)
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid fluid className='nomargin'>

                <div className="itemList">
                    {
                        this.props.questionnaires.length > 0 ?
                            <List className={classes.root} subheader={<li/>}>
                                {
                                    this.props.questionnaires.map(questionnaire => (
                                        <Link to={`/Answers/${questionnaire.id}`}>
                                            <ListItem button
                                                      key={questionnaire.id}
                                              //        selected={this.state.selectedIndex === questionnaire.id}
                                              //        onClick={event => this.handleListItemClick(event, questionnaire)}
                                            >
                                                <Avatar>
                                                    <Assignment/>
                                                </Avatar>
                                                <ListItemText primary="Nombre" secondary={questionnaire.name}/>
                                                <ListItemText primary="Creado" secondary={questionnaire.fechaId}/>
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="Comments"
                                                    //            onClick={() => this.showAnswerGraphics(questionnaire)}
                                                    >
                                                        <PieChart/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </Link>
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

const mapStateToProps = state => ({
    questionnaires: getQuestionnaries(state),
});

const mapDispatchToProps = dispatch => ({
    fetchGetQuestionaries: () => dispatch(fetchGetQuestionaries()),
    getAnswersByQuestionnaire: value => dispatch(getAnswersByQuestionnaire(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnswerList));
