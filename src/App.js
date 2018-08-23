import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Route, Switch } from 'react-router-dom';
import QuestionnairesList from './pages/QuestionnairesList/pages/QuestionnairesList.js';
import Questionnaire from './pages/Questionnaire/pages/Questionnaire/Questionnaire.js'

const QuuestionnairesList = () => (
  <div>
    <QuestionnairesList />
  </div>
);

const Quuestionnaire = () => (
  <div>
    <Questionnaire />
  </div>
);

class App extends Component {
  state = {
    questionnaire: {},
    toQuestionnaire: false,
  };

  goToQuestionnaire = (questionnaire) => {
    this.setState({
      questionnaire: questionnaire,
      toQuestionnaire: true,
    });
  }
  render() {
    return (
      <div>
         <Switch className="App">
          <Route path="/questionnaires" exact component={QuuestionnairesList} />
          <Route path="/questionnaires/new" exact component={Quuestionnaire} />
        </Switch>
      </div>
    );
  }
}

export default App;
