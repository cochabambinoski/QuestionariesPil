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
import {getIndexQuestionary} from '../../../Util/ArrayFilterUtil'
import Modal from "../../../widgets/Modal/components/modal";
import ModalContainer from "../../../widgets/Modal/pages/modal";
import Title from "../../Title/Title";
import Toolbar from "@material-ui/core/Toolbar";

class Questionnaires extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            updateView: true,
            open: false,
            currentItem: -1,
        };
        this.see = this.see.bind(this);
        this.edit = this.edit.bind(this);
    }

    see() {
        this.growl.show({severity: 'info', summary: 'See questionnaire', detail: ''});
    }

    edit() {

        this.growl.show({severity: 'info', summary: 'Edit questionnaire', detail: ''});
    }

    showError(summary, detail) {
        this.growl.show({severity: 'error', summary: summary, detail: detail});
    }

    changeIdQuestionaryClick(value) {
        this.props.changeIdQuestionarySelected(value);
    }

    QuestionSelected(idQuestionary, action) {
        this.idQuestionary = idQuestionary;
        this.action = action
    }

    componentDidMount() {
        fetch(Constants.ROUTE_WEB_SERVICES + Constants.GET_ALL_QUESTIONNAIRES)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({questionnaires: data});
        })
    }

    deleteQuestionary(item) {
        let rangeUrl = `${Constants.ROUTE_WEB_SERVICES}${Constants.GET_QUESTIONER_QUESTIONNAIRES_BY_QUESTIONNAIRE}?questionaryId=${encodeURIComponent(item.id)}`;
        fetch(rangeUrl)
            .then(results => {
                return results.json();
            }).then(data => {
            const questionerQuestionnaires = data;
            if (questionerQuestionnaires.length > 0) {
                this.showError("Error al eliminar", "No se puede eliminar un cuestinario asignado")
            } else {
                this.sendDeleteRequest(item);
            }
        });
    }

    sendDeleteRequest(item) {
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.DELETE_QUESTIONARY}?idQuestionary=${encodeURIComponent(item.id)}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then(results => {
                return results.json();
            }).catch(error => console.error('Error:', error)).then(data => {
            let index = getIndexQuestionary(this.state.questionnaires, item);
            let questionaries = this.state.questionnaires;
            if (data === "Ok" && index !== undefined) {
                questionaries.splice(index, 1)
            }
            this.setState({questionaries: questionaries});
            this.setState({updateView: true});
        });
    }

    openModal = (item) => {
        this.setState({currentItem: item});
        this.setState({open: true});
    }

    closeModal = () => {
        this.setState({open: false});
    }

    handleRemove = () => {
        this.closeModal();
        this.setState((prevState, props) => {
            this.deleteQuestionary(prevState.currentItem);
        });
    }

    render() {
        return (
            <div>
                <Title tilte={'Lista de Encuestas'}
                       subtitle={'En esta sección podrás encontrar la lista de encuestas disponibles.'}/>
                <Growl ref={(el) => this.growl = el}/>
                <Toolbar className="toolbarTable">
                    <div>
                        <Button label="Nuevo"
                                onClick={() => {
                                    this.changeIdQuestionaryClick(new this.QuestionSelected(null, "NEW"))
                                }}/>
                    </div>
                </Toolbar>
                <br/>
                <ScrollPanel style={{width: '100%', height: '750px', margin: '5px'}} className="custom">
                    {
                        this.state.questionnaires.map((item) => {
                            return (
                                <div>
                                    <Card title={item.name} key={item.id}>
                                        <div className="text">
                                            <div>Creado</div>
                                            <div>{item.fechaId} {item.usuarioId}</div>
                                            <br/>
                                            <span>

                                            <Button label="Ver" onClick={() => {
                                                this.changeIdQuestionaryClick(new this.QuestionSelected(item, "SHOW"))
                                            }}/>


                                            <Button label="Editar" onClick={() => {
                                                this.changeIdQuestionaryClick(new this.QuestionSelected(item, "EDIT"))
                                            }}/>

                                            <Button label="Eliminar" className="ui-button-danger" onClick={() => {
                                                this.openModal(item)
                                            }}/>

                                    </span>
                                        </div>
                                    </Card>
                                    <br/>
                                    <ModalContainer>
                                        <Modal open={this.state.open} title={"Eliminar cuestionario"}
                                               message={"Está seguro de eliminar el cuestionario?"}
                                               handleConfirm={this.handleRemove} handleCancel={this.closeModal}>
                                        </Modal>
                                    </ModalContainer>
                                </div>
                            )
                        })
                    }
                </ScrollPanel>
            </div>
        );
    }
}

const mapStateToProps = dispatch => ({});

const mapDispatchToProps = dispatch => ({
    changeIdQuestionarySelected: value => dispatch(changeIdExistingQuestionary(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaires);
