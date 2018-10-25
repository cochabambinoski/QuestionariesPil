import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Header from "./../PublicQuestionnaires/components/Header";
import {getClientsByNitOrNameInSystem, getClientUserByClient} from "../../actions/indexthunk";
import ClientVerifier from '../../components/ClientVerifier';

class AnswerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: props.questionnaire,
            client: null,
            openClientModal: true,
            searchClient: "",
            clientsList: [],
            interviewedName: "",
            firstTimeOpen: true,
            showMinCharsMessage: false,
        };
    }

    setClientAndInterviewed = (client, interviewedName) => {
        this.setState({client, interviewedName});
    };

    modalState = value => {
        this.setState({openClientModal: value});
    };

    render() {
        return (
            <div>
                <Header title={this.state.questionnaire.name} subtitle={this.state.questionnaire.description}/>
                <ClientVerifier
                    modalState={this.modalState}
                    openClientModal={this.state.openClientModal}
                    setClientAndInterviewed={this.setClientAndInterviewed}
                    questionnaire={this.state.questionnaire}
                    invalidateQuestionnaire={this.props.invalidateQuestionnaire}/>
                <div style={{margin: '20px'}} className="client-input" onClick={() => {
                    this.setState({openClientModal: true})
                }}>
                    <div className="client-input-label">Cliente</div>
                    <div className="client-input-name">
                        {
                            this.state.client !== null ?
                                <div>{this.state.client.label}</div> :
                                this.state.interviewedName !== "" ?
                                    <div>{this.state.interviewedName}</div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getClientsByNitOrNameInSystem: (searchTerm, system) => dispatch(getClientsByNitOrNameInSystem(searchTerm, system)),
    getClientUserByClient: value => dispatch(getClientUserByClient(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPage);