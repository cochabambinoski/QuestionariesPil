import React, {Component} from 'react';
import AssignmentQuestionary from "../../../AssignmentScreen/pages/AssignmentQuestionary";
import {connect} from 'react-redux';
import {getMenu} from '../../../../reducers'
import PropTypes from 'prop-types';
import QuestionaryContainer from "../../../QuestionnairesList/QuestionaryContainer";
import {Start} from "../../../Start/Start";
import ListSegment from "../../../ListSegments/pages/ListSegments";

class Container extends Component {
    render() {
        return (
            <div style={{marginTop: '5px'}}>
                {
                    this.props.idMenu === '1080500' ?
                        <Start/> :
                        this.props.idMenu === '1080501' ?
                            <QuestionaryContainer/>
                            : this.props.idMenu === '1080502' ? <AssignmentQuestionary/> :
                            this.props.idMenu === '1080600' ? <ListSegment/> : null
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