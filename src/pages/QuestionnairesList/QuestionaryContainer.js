import React, {Component} from 'react';
import Questionnaire from "../Questionnaire/pages/Questionnaire/Questionnaire";
import Questionnaires from "./pages/QuestionnairesList";
import {connect} from 'react-redux';
import {getQuestionarySelected} from "../../reducers";

class QuestionaryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            detail: null,
        };
        this.showMessage = this.showMessage.bind(this);
    }

    showMessage(title, detail) {
        this.setState({title: title});
        this.setState({detail: detail});
    }

    render() {
        const {questionarySelected} = this.props;
        return (
            <div>
                {
                    questionarySelected === null ?
                        <Questionnaires title={this.state.title} detail={this.state.detail} showMessage={this.showMessage}/>
                        : questionarySelected.action === "NEW" ?
                        <Questionnaire questionary={null}/> :
                        questionarySelected.action === "EDIT" ?
                            <Questionnaire questionary={questionarySelected}
                                           questionnaireId1={questionarySelected.idQuestionary.id} showMessage={this.showMessage}/> :
                            <Questionnaire questionary={questionarySelected} questionnaireId1={questionarySelected.idQuestionary.id}
                                           readOnly={true} showMessage={this.showMessage}/>

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
