import React from 'react'
import {Growl} from "primereact/growl";
import {Route} from "react-router-dom";
import {Start} from "../../Start/Start";
import {
    answersIdRoute,
    answersRoute,
    assigmentIdRoute,
    assigmentRoute, costConditionsRoute, expensesGenerationRoute, loadBaseInputRoute,
    questionariesEditIdRoute,
    questionariesNewRoute,
    questionariesRoute,
    questionariesShowIdRoute, segmentRoute
} from "../../../routes/PathRoutes";
import Questionnaires from "../../QuestionnairesList/pages/QuestionnairesList";
import Questionnaire from "../../Questionnaire/pages/Questionnaire/Questionnaire";
import AsigmentQuestionaryContainer from "../../AssignmentScreen/pages/AsigmentQuestionaryContainer";
import AssignmentQuestionary from "../../AssignmentScreen/pages/AssignmentQuestionary";
import AnswerContainer from "../../AnswersQuestionnaire/pages/AnswerContainer/AnswerContainer";
import GraphicsDetail from "../../AnswersQuestionnaire/pages/GraphicsDetail/GraphicsDetail";
import ListSegment from "../../ListSegments/pages/ListSegments";
import GenerationExpenses from "../../GenerationExpenses/GenerationExpenses";
import LoadBaseInput from "../../LoadBaseInput/LoadBaseInput";
import CostConditions from "../../costConditions/CostConditions";

function ComponentInflator(props) {
    return(
        <div>
            <div className="layout-main">
                <Growl ref={(el) => this.growl = el}/>
                <Route path="/" exact component={Start}/>
                {/*Questionaries Create Show Edit Delete*/}
                <Route path={questionariesRoute} exact
                       render={(props) => <Questionnaires title={this.props.state.title}
                                                          detail={this.props.state.detail}
                                                          showMessage={this.props.showSuccess}
                                                          {...props}/>}
                />
                <Route path={questionariesNewRoute} exact strict
                       render={(props) => <Questionnaire questionary={null}
                                                         showMessage={this.props.showSuccess}
                                                         {...props}/>}
                />
                <Route path={questionariesShowIdRoute} exact strict
                       render={props => <Questionnaire questionnaireId={props.match.params.id}
                                                       readOnly={true}
                                                       showMessage={this.showSuccess} {...props}/>}
                />
                <Route path={questionariesEditIdRoute} exact strict
                       render={props => <Questionnaire questionnaireId={props.match.params.id}
                                                       showMessage={this.showSuccess} {...props}/>}
                />
                {/*Assigment Questionnaries*/}

                <Route path={assigmentRoute} exact component={AsigmentQuestionaryContainer}/>
                <Route path={assigmentIdRoute} exact strict
                       render={props => <AssignmentQuestionary
                           idQuestionary={props.match.params.id}
                           onSelectedQuestionary={null}
                           showSuccess={this.showSuccess} {...props}/>}
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
            </div>
        </div>
    )
}

export default ComponentInflator;
