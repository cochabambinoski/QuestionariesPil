import React, {Component} from 'react';
import AssignmentQuestionary from "../../../AssignmentScreen/pages/AssignmentQuestionary";
import {connect} from 'react-redux';
import {getMenu} from '../../../../reducers'
import QuestionaryContainer from "../../../QuestionnairesList/QuestionaryContainer";
import {Start} from "../../../Start/Start";

class Container extends Component {
    render() {
        return (
            <div style={{marginTop: '5px'}}>
                {
                    this.props.idMenu ===0 ?
                        <Start/>:
                   this.props.idMenu === 1   ?
                       <QuestionaryContainer/>
                       :<AssignmentQuestionary/>
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({idMenu: getMenu(state)});

export default connect(mapStateToProps, null)(Container);