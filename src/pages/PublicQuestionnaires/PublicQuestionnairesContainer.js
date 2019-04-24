import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import AnswerPageContainer from "../AnswerPage/AnswerPageContainer";
import {getQuestionnairesByReach} from "../../actions/indexthunk";
import {getQuestionnaries} from "../../reducers";
import ErrorPage from "../ErrorPage/pages/ErrorPage";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router/es/Route";
import PublicQuestionnairesListContainer from "./components/PublicQuestionnairesListContainer";
import {Growl} from 'primereact/growl';

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
        this.setState({questionnaireSelected: id});
    };

    invalidateQuestionnaire = () => {
        this.setState({questionnaireSelected: null});
    };

    showMessageAndInvalidate = (title, message, messageType) => {
        this.setState(() => {
            this.growl.show({severity: messageType, summary: title, detail: message});
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="container-background">
                    <Growl ref={(el) => this.growl = el}/>
                    {
                        this.props.connection === false ? <ErrorPage/> :
                            <Fragment>
                                <Route path="/questionary/:id"
                                       render={props =>
                                           <AnswerPageContainer
                                               questionnaireId={props.match.params.id}
                                               invalidateQuestionnaire={this.invalidateQuestionnaire}
                                               showMessageAndInvalidate={this.showMessageAndInvalidate}
                                               {...props}/>}/>
                                <Route path="/" exact
                                       component={PublicQuestionnairesListContainer}/>
                            </Fragment>
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
