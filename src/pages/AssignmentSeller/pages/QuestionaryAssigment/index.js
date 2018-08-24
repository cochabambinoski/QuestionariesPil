import React, {Component} from 'react';
import QuestionaryData from "./components/QuestionaryData/QuestionaryData";
import PropTypes from "prop-types";
import './styles.css'

class Questionary extends Component {

    render() {
        return (
            <div>
                <QuestionaryData data={this.props.questionary}
                                 handleQuestionaryLocationDataClick={this.props.onSelectedQuestionaryClick}/>
            </div>
        );
    }
}

Questionary.propTypes = {
    onSelectedQuestionary: PropTypes.func,
};

export default Questionary;
