import React, {Component} from 'react';
//import AssignmentQuestionary from "../../../AssignmentScreen/pages/AssignmentQuestionary";
import ListSegments from "../../../ListSegments/pages/ListSegments";
//import ListSegments from "../../../ListSegments/pages/components/SegmentTable/EnhancedTable";
//import ListSegments from "../../../QuestionnairesList/pages/QuestionnairesList";

class Container extends Component {
    render() {
        return (
            <div style={{marginTop: '5px'}}>
                <ListSegments/>
            </div>
        );
    }
}

export default Container;