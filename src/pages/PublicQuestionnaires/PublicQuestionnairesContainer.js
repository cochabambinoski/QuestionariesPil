import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import PublicQuestionnairesList from "./components/PublicQuestionnairesList";
import AnswerPageContainer from "../AnswerPage/AnswerPageContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {getQuestionnairesByReach} from "../../actions/indexthunk";
import {getQuestionnaries} from "../../reducers";
import ErrorPage from "../ErrorPage/pages/ErrorPage";

class PublicQuestionnairesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            questionnaireSelected: null,
        };
    }

    componentDidMount() {
        this.props.getQuestionnairesByReach('PUBLICO');
    }

    handleClick = (id) => {
        //TODO: push a la ruta de respuestas
        console.log("questionnaire id: " + id);
        this.setState({questionnaireSelected: id});
    };

    render() {
        return (
            <div>
                {
                    this.props.connection === false ? <ErrorPage/> :
                        this.state.questionnaireSelected !== null ?
                            <AnswerPageContainer questionnaireId={this.state.questionnaireSelected}/> :
                            <div>
                                <Header title={'Cuestionarios'}/>
                                <PublicQuestionnairesList questionnaires={this.props.questionnaires}
                                                          handleClick={this.handleClick}/>
                                <Footer/>
                            </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicQuestionnairesContainer);