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
        const route = this.props.idMenu.transaccion !== undefined ? this.props.idMenu.transaccion.ruta : null;
        let component = null;
        switch (route) {
            case 'Start':
                component = <Start/>;
                break;
            case 'QuestionaryContainer':
                component = <QuestionaryContainer/>;
                break;
            case 'AssignmentQuestionary':
                component = <AsigmentQuestionaryContainer/>;
                break;
            case 'ListSegment':
                component = <ListSegment/>;
                break;
            case 'AnwserQuestionaryContainer':
                component = <AnswerContainer/>;
                break;
            default:
                component = <Start/>;
                break;
        }
        return (
            <div style={{marginTop: '5px'}}>
                {component}
            </div>
        );
    }
}

const mapStateToProps = state => ({idMenu: getMenu(state)});

export default connect(mapStateToProps, null)(Container);