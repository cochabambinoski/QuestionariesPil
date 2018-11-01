import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import PublicQuestionnairesList from "./components/PublicQuestionnairesList";
import AnswerPageContainer from "../AnswerPage/AnswerPageContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {getQuestionnairesByReach} from "../../actions/indexthunk";
import {getQuestionnaries} from "../../reducers";
import ErrorPage from "../ErrorPage/pages/ErrorPage";
import ClientVerifier from "../../components/ClientVerifier";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router/es/Route";

function PublicQuestionaryList() {
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
    )
}


class PublicQuestionnairesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            questionnaireSelected: null,
            openClientModal: false,
        };
    }

    modalState = value => {
        this.setState({openClientModal: value});
    };

    componentDidMount() {
        this.props.getQuestionnairesByReach('PUBLICO');
    }

    handleClick = (id) => {
        //TODO: push a la ruta de respuestas
        console.log("questionnaire id: " + id);
        this.setState({questionnaireSelected: id});
    };

    invalidateQuestionnaire = () => {
        this.setState({questionnaireSelected: null});
    };

    render() {
        return (
            <BrowserRouter>
                <div className="container-background">
                    {
                        this.props.connection === false ? <ErrorPage/> :
                            // this.state.questionnaireSelected !== null
                            //     ?
                                <Fragment>
                                    <Route path="/questionaryPil/:id" render={props => <AnswerPageContainer questionnaireId={props.match.params.id} invalidateQuestionnaire={this.invalidateQuestionnaire}/> }/>
                                    <Route path="/"/>
                                </Fragment>
                                // :
                                // <div>
                                //     <Header title={'Cuestionarios'}/>
                                //     <ClientVerifier
                                //         modalState={this.modalState}
                                //         openClientModal={this.state.openClientModal}
                                //         setClientAndInterviewed={null}
                                //         questionnaire={null}
                                //         invalidateQuestionnaire={null}/>
                                //     <PublicQuestionnairesList questionnaires={this.props.questionnaires}
                                //                               handleClick={this.handleClick}/>
                                //     <div onClick={() => this.setState({openClientModal: true})}>
                                //         <Footer />
                                //     </div>
                                // </div>
                    }
                </div>
            </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicQuestionnairesContainer);