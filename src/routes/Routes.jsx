import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {Start} from "../pages/Start/Start";
import {answersIdRoute, answersRoute, assigmentIdRoute, assigmentRoute, conceptCenterRoute, costConditionsRoute,
    exchangeRateRoute, expensesGenerationRoute, jobsEtlRoute, loadBaseInputRoute, operatingAccountsRoute,
    periodAndAccountRegistrationRoute, questionariesEditIdRoute, questionariesNewRoute, questionariesRoute,
    questionariesShowIdRoute, segmentRoute, typeCenterRoute
} from "./PathRoutes";
import Questionnaires from "../pages/QuestionnairesList/pages/QuestionnairesList";
import Questionnaire from "../pages/Questionnaire/pages/Questionnaire/Questionnaire";
import AsigmentQuestionaryContainer from "../pages/assignmentOfQuestionnaires/pages/selectionOfQuestionnairesForAssignment/AsigmentQuestionaryContainer";
import AssignmentQuestionary from "../pages/assignmentOfQuestionnaires/pages/assignmentQuestionary/AssignmentQuestionary";
import AnswerContainer from "../pages/AnswersQuestionnaire/pages/AnswerContainer/AnswerContainer";
import GraphicsDetail from "../pages/AnswersQuestionnaire/pages/GraphicsDetail/GraphicsDetail";
import ListSegment from "../pages/ListSegments/pages/ListSegments";
import GenerationExpenses from "../pages/GenerationExpenses/GenerationExpenses";
import LoadBaseInput from "../pages/LoadBaseInput/LoadBaseInput";
import CostConditions from "../pages/costConditions/CostConditions";
import PeriodAndAccountRegistration from "../pages/periodAndAccountRegistration/PeriodAndAccountRegistration";
import ExchangeRate from "../pages/exchangeRate/ExchangeRate";
import OperatingAccounts from "../pages/operatingAccounts/OperatingAccounts";
import ConceptCenter from "../pages/conceptCenter/ConceptCenter";
import TypeCenter from "../pages/typeCenter/TypeCenter";
import jobsETL from "../pages/jobsETL/jobsETL";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Start}/>
                {/*Questionaries Create Show Edit Delete*/}
                <Route path={questionariesRoute} exact
                       render={(props) => <Questionnaires title={this.props.title} detail={this.props.detail}
                                                          showMessage={this.props.showSuccess}{...props}/>}
                />
                <Route path={questionariesNewRoute} exact strict
                       render={(props) => <Questionnaire questionary={null} showMessage={this.props.showSuccess}
                                                         {...props}/>}
                />
                <Route path={questionariesShowIdRoute} exact strict
                       render={props => <Questionnaire questionnaireId={props.match.params.id} readOnly={true}
                                                       showMessage={this.props.showSuccess} {...props}/>}
                />
                <Route path={questionariesEditIdRoute} exact strict
                       render={props => <Questionnaire questionnaireId={props.match.params.id}
                                                       showMessage={this.props.showSuccess} {...props}/>}
                />
                {/*Assigment Questionnaries*/}
                <Route path={assigmentRoute} exact component={AsigmentQuestionaryContainer}/>
                <Route path={assigmentIdRoute} exact strict
                       render={props => <AssignmentQuestionary idQuestionary={props.match.params.id}
                           onSelectedQuestionary={null} showSuccess={this.props.showSuccess} {...props}/>}
                />
                {/*Answers Questionnaries*/}
                <Route path={answersRoute} exact component={AnswerContainer}/>
                <Route path={answersIdRoute} exact
                       render={props => <GraphicsDetail
                           idQuestionary={props.match.params.id}
                       />}
                />
                {/*Segment */}
                <Route path={segmentRoute} exact component={ListSegment}/>
                {/*Finanzas */}
                <Route exact path={expensesGenerationRoute} component={GenerationExpenses}/>
                <Route exact path={loadBaseInputRoute} component={LoadBaseInput}/>
                <Route exact path={costConditionsRoute} component={CostConditions}/>
                <Route exact path={periodAndAccountRegistrationRoute} component={PeriodAndAccountRegistration}/>
                <Route exact path={exchangeRateRoute} component={ExchangeRate}/>
                <Route exact path={operatingAccountsRoute} component={OperatingAccounts}/>
                <Route exact path={conceptCenterRoute} component={ConceptCenter}/>
                <Route exact path={typeCenterRoute} component={TypeCenter}/>
                <Route exact path={jobsEtlRoute} component={jobsETL}/>
            </div>
        );
    }
}

export default Routes;
