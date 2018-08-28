import React, {Component} from 'react';
import Constants from "../../../../Constants";
import Questionary from "./index";
import './styles.css'
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import MobileSellerItem from "../MobileSellerList/components/MobileSellerItem/MobileSellerItem";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 800,
        marginBottom: 5,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});


class QuestionaryAsignmet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionnaires: null,
        }
    }

    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({questionnaires: data});
        })
    }

    stringToComponent(questionaries) {
        return <List className={this.props.classes.root} subheader={<li />}>
            {
                questionaries.map((questionary) => (
                    <Questionary questionary={questionary} key={questionary.id}
                                 onSelectedQuestionaryClick={this.props.onSelectedQuestionary}/>
                ))
            }
        </List>
    };

    render() {
        const {questionnaires} = this.state
        return (
            <div>
                {
                    questionnaires ? this.stringToComponent(questionnaires) : <CircularProgress style={{width: '50%', height: '50%'}}/>
                }
            </div>
        );
    }
}

QuestionaryAsignmet.propTypes = {
    onSelectedQuestionary: PropTypes.func,
};

export default withStyles(styles)(QuestionaryAsignmet);
