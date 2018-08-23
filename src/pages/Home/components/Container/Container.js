import React, {Component} from 'react';
import QuestionnairesList from "../../../QuestionnairesList/pages/QuestionnairesList";
import AssignmentQuestionary from "../../../AssignmentScreen/AssignmentQuestionary";

class Container extends Component {
    render() {
        return (
            <div>
                <AssignmentQuestionary/>
            </div>
        );
    }
}

export default Container;