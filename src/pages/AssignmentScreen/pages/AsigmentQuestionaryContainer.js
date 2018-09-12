import React, {Component} from 'react';
import {InputText} from "primereact/inputtext";
import QuestionaryAsignmet from "../../AssignmentSeller/pages/QuestionaryAssigment/QuestionaryAsignmet";
import AssignmentQuestionary from "./AssignmentQuestionary";
import {connect} from 'react-redux';
import {editQueryTextAssignedQuestionary} from "../../../actions";

class AsigmentQuestionaryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
        }
    }

    handleSelectedQuestionary = idQuestionary => {
        this.setState({idQuestionary: idQuestionary})
    };

    render() {
        const {idQuestionary} = this.state;
        console.log(this.state.idQuestionary)
        return (
            <div>
                {
                    !this.state.idQuestionary ?
                        <div>
                            <InputText value={this.state.value1}
                                       onChange={(e) => this.props.editQueryTextAssignedQuestionary(e.target.value)}/>
                            <QuestionaryAsignmet onSelectedQuestionary={this.handleSelectedQuestionary}/>
                        </div>
                        : <AssignmentQuestionary idQuestionary={this.state.idQuestionary} onSelectedQuestionary={this.handleSelectedQuestionary}/>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
});

export default  connect(null, mapDispatchToProps)(AsigmentQuestionaryContainer);