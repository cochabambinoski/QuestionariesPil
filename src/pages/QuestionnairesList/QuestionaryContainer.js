import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Questionnaire from "../Questionnaire/pages/Questionnaire/Questionnaire";
import Questionnaires from "./pages/QuestionnairesList";

class QuestionaryContainer extends Component {


    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Questionnaires}/>
                    <Route exact path="/?user=" component={Questionnaires}/>
                    <Switch>
                        <Route exact path="/questionnaires/edit/:idQuestionary"
                               render={props => <Questionnaire idQuestionary={props.match.params.id}/>}/>
                        <Route exact path="/questionnaires/:idQuestionary"
                               render={props => <Questionnaire idQuestionary={props.match.params.id}/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

QuestionaryContainer.propTypes = {};

export default QuestionaryContainer;
