import React, {Component} from 'react';
import {getQuestionnairesByReach} from "../../../actions/indexthunk";
import {getQuestionnaries} from "../../../reducers";
import connect from "react-redux/es/connect/connect";
import ClientVerifier from "../../../components/ClientVerifier";
import PublicQuestionnairesList from "./PublicQuestionnairesList";
import Footer from "./Footer";
import Header from "./Header";

class PublicQuestionnairesListContainer extends Component {

    constructor(props){
     super(props);
     this.state = {
         questionnaires:[],
         openClientModal: false,
     };
    }

    modalState = value => {
        this.setState({openClientModal: value});
    };

    componentDidMount() {
        this.props.getQuestionnairesByReach('PUBLICO');
    }

    render() {
        return (
            <div>
                <Header title={'Cuestionarios'}/>
                     <ClientVerifier
                        modalState={this.modalState}
                        openClientModal={this.state.openClientModal}
                        setClientAndInterviewed={null}
                        questionnaire={null}
                        invalidateQuestionnaire={null}/>
                    <PublicQuestionnairesList questionnaires={this.props.questionnaires}
                                              handleClick={this.handleClick}/>
                    <div onClick={() => this.setState({openClientModal: true})}>
                        <Footer />
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    questionnaires: getQuestionnaries(state),
    connection: state.connection,
});

const mapDispatchToProps = dispatch => ({
    getQuestionnairesByReach: value => dispatch(getQuestionnairesByReach(value)),
});

export default connect(mapStateToProps, mapDispatchToProps) (PublicQuestionnairesListContainer);