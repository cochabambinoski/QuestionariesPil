import React, {Component} from 'react';
import AssignmentQuestionary from "../../../AssignmentScreen/pages/AssignmentQuestionary";
import {connect} from 'react-redux';
import {getMenu} from '../../../../reducers'
import PropTypes from 'prop-types';
import QuestionaryContainer from "../../../QuestionnairesList/QuestionaryContainer";
import FloatingActionButtonZoom from "../../../FloatingActionButtonZoom";

class Container extends Component {
    render() {
        return (
            <div style={{marginTop: '5px'}}>
                {
                   this.props.idMenu === 1 || this.props.idMenu === 0   ?
                       <QuestionaryContainer/>
                       :<AssignmentQuestionary/>
                }

            </div>
        );
    }
}

Container.propTypes = {
    idMenu: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({idMenu: getMenu(state)});

export default connect(mapStateToProps, null)(Container);