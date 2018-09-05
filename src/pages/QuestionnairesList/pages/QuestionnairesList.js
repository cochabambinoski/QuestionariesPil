import React, {Component} from 'react';
import './QuestionnairesList.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import Constants from '../../../Constants.json';
import {connect} from 'react-redux';
import {changeIdExistingQuestionary} from '../../../actions/index';
import {ScrollPanel} from "primereact/scrollpanel";

class Questionnaires extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: []
        };
        this.see = this.see.bind(this);
        this.edit = this.edit.bind(this);
    };
    see() {
        this.growl.show({ severity: 'info', summary: 'See questionnaire', detail: '' });
    }
    edit() {

        this.growl.show({ severity: 'info', summary: 'Edit questionnaire', detail: '' });
    }

    changeIdQuestionaryClick(value){
        this.props.changeIdQuestionarySelected(value);
    }

    QuestionSelected(idQuestionary, action){
        this.idQuestionary = idQuestionary;
        this.action = action
    }

    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ questionnaires: data });
            })
    }
    render() {
        return (
            <div className="questionnaire">
                <Button label="Nuevo"
                        onClick={() => {this.changeIdQuestionaryClick(new this.QuestionSelected(null, "NEW"))}}/>
                <ScrollPanel style={{width: '100%', height: '750px', margin: '5px'}} className="custom">
                    <Growl ref={(el) => this.growl = el} />
                    {
                        this.state.questionnaires.map((item) => {
                            return (
                                <Card title={item.name}  key={item.id}>
                                    <div>
                                        <div className="light-text">Creado</div>
                                        <div className="normal-text">{item.fechaId} {item.usuarioId}</div>
                                        <br />
                                        <span>

                                            <Button label="Ver" onClick={() => {this.changeIdQuestionaryClick(new this.QuestionSelected(item, "SHOW"))}}/>


                                            <Button label="Editar" onClick={() => {this.changeIdQuestionaryClick(new this.QuestionSelected(item, "EDIT"))}} />

                                    </span>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </ScrollPanel>
            </div>
        );
    }
}

const mapStateToProps = dispatch => ({

});

const mapDispatchToProps = dispatch => ({
    changeIdQuestionarySelected: value => dispatch(changeIdExistingQuestionary(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaires);