import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getQuetionnaireById} from "../../actions/indexthunk";
import AnswerPage from "./AnswerPage";

class AnswerPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
        };
    }

    componentDidMount() {
        this.props.getQuetionnaireById(this.props.questionnaireId)
            .then(response => {
                this.setState({ questionnaire: response });
            });
    }

    invalidateQuestionnaire = () => {
        this.props.invalidateQuestionnaire();
    };

    render() {
        return (
            <div className="container-background">
                {
                    this.state.questionnaire ?
                        <AnswerPage questionnaire={this.state.questionnaire} invalidateQuestionnaire={this.invalidateQuestionnaire} />
                        : <div>Cargando...</div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getQuetionnaireById: value => dispatch(getQuetionnaireById(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPageContainer);