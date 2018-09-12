import React, {Component} from 'react';
import Constants from "../../../../Constants";
import Questionary from "./index";
import './styles.css'
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import {getQueryQuestionerAssigment} from "../../../../reducers";

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

    filterItems = (questionaries ,query) => {
        return questionaries.filter((el) =>
            el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    stringToComponent(questionaries) {
        let filterList = questionaries;
        if(this.props.queryMobileSeller !== ""){
            filterList = this.filterItems(questionaries, this.props.queryQuestionaerAssigment);
        }
        return <List className={this.props.classes.root} subheader={<li />}>
            {
                filterList.map((questionary) => (
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

const mapStateToProps = state => ({
    queryQuestionaerAssigment: getQueryQuestionerAssigment(state)
});

export default connect(mapStateToProps, null)(withStyles(styles)(QuestionaryAsignmet));
