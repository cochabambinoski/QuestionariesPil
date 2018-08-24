import React, {Component} from 'react';
import Constants from "../../../../Constants";
import Questionary from "./index";
import './styles.css'
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';

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

    stringToComponent = questionaries => (
        questionaries.map((questionary) => (
            <Questionary questionary={questionary} key={questionary.id}
                         onSelectedQuestionaryClick={this.props.onSelectedQuestionary}/>
        ))
    );

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

export default QuestionaryAsignmet;
