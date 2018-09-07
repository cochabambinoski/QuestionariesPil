import React, {Component} from 'react';
import Questionnaire from "../Questionnaire/pages/Questionnaire/Questionnaire";
import Questionnaires from "./pages/QuestionnairesList";
import {connect} from 'react-redux';
import {getQuestionarySelected} from "../../reducers";

class QuestionaryContainer extends Component {


    render() {

        const {questionarySelected} = this.props;
        return (
            <div>
                {
                    questionarySelected === null ?
                        <Questionnaires/>
                        : questionarySelected.action === "NEW" ?
                        <Questionnaire questionary={null} /> :
                        questionarySelected.action === "EDIT" ?
                            <Questionnaire questionary={questionarySelected} questionnaireId1={questionarySelected.idQuestionary.id}/> :
                            <Questionnaire questionary={questionarySelected} questionnaireId1={questionarySelected.idQuestionary.id} readOnly={true}/>

                }
            </div>
        );
    }
}

QuestionaryContainer.propTypes = {};

const mapStateToProps = state => ({
    questionarySelected: getQuestionarySelected(state)
});

export default connect(mapStateToProps, null)(QuestionaryContainer);
