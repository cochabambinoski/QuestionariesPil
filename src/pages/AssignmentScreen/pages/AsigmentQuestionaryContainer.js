import React, {Component} from 'react';
import {InputText} from "primereact/inputtext";
import QuestionaryAsignmet from "../../AssignmentSeller/pages/QuestionaryAssigment/QuestionaryAsignmet";
import AssignmentQuestionary from "./AssignmentQuestionary";
import {connect} from 'react-redux';
import {editQueryTextAssignedQuestionary} from "../../../actions";
import Title from "../../Title/Title";

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
                        <div className="text">
                            <Title tilte={'Asignación de Cuestionarios'}
                                   subtitle={'En esta sección podrás asignar tus cuestionarios a una o varias personas encargadas de realizar la encuesta.'}/>
                            <br/>
                            <InputText value={this.state.value1}
                                       onChange={(e) => this.props.editQueryTextAssignedQuestionary(e.target.value)}
                                       placeholder={'Filtrar por nombre'}
                                       className="text"/>
                            <QuestionaryAsignmet onSelectedQuestionary={this.handleSelectedQuestionary}/>
                        </div>
                        : <AssignmentQuestionary idQuestionary={this.state.idQuestionary}
                                                 onSelectedQuestionary={this.handleSelectedQuestionary}/>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
});

export default  connect(null, mapDispatchToProps)(AsigmentQuestionaryContainer);