import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMenu} from '../../../../reducers'
import QuestionaryContainer from "../../../QuestionnairesList/QuestionaryContainer";
import {Start} from "../../../Start/Start";
import ListSegment from "../../../ListSegments/pages/ListSegments";
import AsigmentQuestionaryContainer from "../../../AssignmentScreen/pages/AsigmentQuestionaryContainer";
import AnswerContainer from "../../../AnswersQuestionnaire/pages/AnswerContainer/AnswerContainer";

class Container extends Component {
    render() {
        return (
            <div style={{marginTop: '5px'}}>
                {
                    this.props.idMenu === '1080501' ?
                        <Start/> :
                        this.props.idMenu === '1080502' ?
                            <QuestionaryContainer/>
                            : this.props.idMenu === '1080503' ? <AsigmentQuestionaryContainer/> :
                            this.props.idMenu === '1080600' ? <ListSegment/> :
                                this.props.idMenu === '1080504' ? <AnswerContainer/> : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({idMenu: getMenu(state)});

export default connect(mapStateToProps, null)(Container);