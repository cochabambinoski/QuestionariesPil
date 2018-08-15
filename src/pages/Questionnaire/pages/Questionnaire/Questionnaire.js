import React, { Component } from 'react';
import './Questionnaire.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import Questions from '../../components/Questions/Questions.js';
import QuestionnaireRange from '../../components/QuestionnaireRange/QuestionnaireRange.js';
import Constants from '../../../../Constants.json';
import { Redirect } from 'react-router-dom'

class Questionnaire extends Component {
    constructor() {
        super();
        this.state = {
            value: null,
            name: null,
            userId: 'jarispe',
            description: '',
            lsQuestions: [],
            lsBranches: [],
            lsCities: [],
            savedSuccessfully: false
        };
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.saveQuestionnaire = this.saveQuestionnaire.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.selectCities = this.selectCities.bind(this);
        this.selectBranches = this.selectBranches.bind(this);
    };
    showSuccess(summary, detail) {
        this.growl.show({ severity: 'success', summary: summary, detail: detail });
    }
    showError(summary, detail) {
        this.growl.show({ severity: 'error', summary: summary, detail: detail });
    }
    saveQuestionnaire() {
        if (this.state.name == null) {
            this.showError("Campo obligatorio", "Debe especificar el nombre del cuestionario")
            return
        }
        let questionaries = [
            {
                id: null,
                name: this.state.name,
                description: this.state.description,
                lsQuestions: this.state.lsQuestions,
                sociedadId: "BO81",
                usuarioId: this.state.userId,
                operacionId: 1,
            },
        ];
        let strQuestionaries = JSON.stringify(questionaries);
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.SAVE_QUESTIONNAIRE}?questionaries=${encodeURIComponent(strQuestionaries)}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Cache-Control': 'no-cache',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(results => {
            return results.json();
        }).then(data => {
            if (data === "Ok") {
                this.showSuccess("Transaccion exitosa", "Cuestionario guardado");
                this.setState({ savedSuccessfully: true });
            }
            else {
                this.showError("Error al guardar", data)
            }
        });

    }
    removeQuestion(index) {
        let aux = this.state.lsQuestions
        aux.splice(index, 1)
        this.setState({ lsQuestions: aux });
    }
    selectCities(cities) {
        console.log("Questionnaire select cities: " + cities);
        this.setState({ lsCities: cities });
    }
    selectBranches(branches) {
        console.log("Questionnaire select branches: " + branches);
        this.setState({ lsBranches: branches });
    }
    handleCloseModal = (event) => {
        this.setState({
            modalVisible: false,
        })
    }
    render() {
        {
            if (this.state.savedSuccessfully){
                return <Redirect to='/questionnaires' />
            }
        }
        return (
            <div className="questionnaire">
                <Growl ref={(el) => this.growl = el} />
                <div className="left">
                    <div className="content-section implementation">
                        <div className="card card-w-title">
                            <InputText id="float-input" placeholder="Nombre del cuestionario" type="text" required maxLength="50" size="32" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        </div>
                        <div className="card card-w-title">
                            <InputTextarea className="description" placeholder="Descripcion (opcional)" type="text" maxLength="255" size="32" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} rows={5} cols={20} autoResize={false} />
                        </div>

                    </div>

                    <div className="content-section">
                        <Questions questions={this.state.lsQuestions}
                            removeQuestion={this.removeQuestion}></Questions>
                    </div>

                    <div className="content-section button-save">
                        <Button label="Guardar" onClick={this.saveQuestionnaire} />
                    </div>
                </div>

                <div className="right">
                    <QuestionnaireRange selectCities={this.selectCities}
                        selectBranches={this.selectBranches} />
                </div>
            </div>
        );
    }
}

export default Questionnaire;