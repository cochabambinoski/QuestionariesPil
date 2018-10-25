import React, {Component} from 'react';
import {InputText} from "primereact/inputtext";
import QuestionaryAsignmet from "../../AssignmentSeller/pages/QuestionaryAssigment/QuestionaryAsignmet";
import AssignmentQuestionary from "./AssignmentQuestionary";
import {connect} from 'react-redux';
import {editQueryTextAssignedQuestionary} from "../../../actions";
import Title from "../../Title/Title";
import {Messages} from "../../../../node_modules/primereact/messages";

class AsigmentQuestionaryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
            message: null,
        };
        this.showSuccess = this.showSuccess.bind(this);
    }

    handleSelectedQuestionary = idQuestionary => {
        this.setState({idQuestionary: idQuestionary})
    };

    showSuccess(title, detail) {
        this.messages.show({severity: 'success', summary: title, detail: detail});
    }

    render() {
        return (
            <div>
                {
                    !this.state.idQuestionary ?
                        <div className="text">
                            <Title tilte={'Asignación de Cuestionarios'}
                                   subtitle={'En esta sección podrás asignar tus cuestionarios a una o varias personas encargadas de realizar la encuesta.'}/>
                            <Messages ref={(el) => this.messages = el}/>
                            <br/>
                            <InputText value={this.state.value1}
                                       onChange={(e) => this.props.editQueryTextAssignedQuestionary(e.target.value)}
                                       placeholder={'Filtrar por nombre'}
                                       className="text"/>
                            <QuestionaryAsignmet onSelectedQuestionary={this.handleSelectedQuestionary}/>
                        </div>
                        : <AssignmentQuestionary idQuestionary={this.state.idQuestionary}
                                                 onSelectedQuestionary={this.handleSelectedQuestionary}
                                                 showSuccess={this.showSuccess}/>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
});

export default connect(null, mapDispatchToProps)(AsigmentQuestionaryContainer);