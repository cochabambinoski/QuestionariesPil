import React, {Component} from 'react';
import './QuestionnairesList.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import {connect} from 'react-redux';
import {changeIdExistingQuestionary} from '../../../actions/index';
import {ScrollPanel} from "primereact/scrollpanel";
import Modal from "../../../widgets/Modal/components/modal";
import ModalContainer from "../../../widgets/Modal/pages/modal";
import Title from "../../Title/Title";
import Toolbar from "@material-ui/core/Toolbar";
import {deleteQuestionnaire, fetchGetQuestionaries} from '../../../actions/indexthunk';
import {getQuestionnaries} from "../../../reducers";
import {Link} from "react-router-dom";

class Questionnaires extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            updateView: true,
            open: false,
            currentItem: -1,
        };
    }

    showError(summary, detail) {
        this.messages.show({severity: 'error', summary: summary, detail: detail});
    }

    showSuccess(summary, detail) {
        this.messages.show({severity: 'success', summary: summary, detail: detail});
    }

    changeIdQuestionaryClick(value) {
        this.props.changeIdQuestionarySelected(value);
    }

    QuestionSelected(idQuestionary, action) {
        this.idQuestionary = idQuestionary;
        this.action = action
    }

    componentDidMount() {
        this.props.fetchGetQuestionaries();
        const title = this.props.title;
        const detail = this.props.detail;
        if (title !== null && detail !== null) {
            this.showSuccess(title, detail);
            this.props.showMessage(null, null);
        }
    }

    deleteQuestionary(item) {
        this.props.deleteQuestionnaire(item)
            .then((result) => {
                switch (result) {
                    case "DELETED":
                        this.showSuccess("Cuestionario eliminado");
                        break;
                    case "ASSIGNED":
                        this.showError("Error al eliminar", "No se puede eliminar un cuestinario asignado");
                        break;
                    default:
                        break;
                }
            });
    }

    openModal = (item) => {
        this.setState({currentItem: item});
        this.setState({open: true});
    };

    closeModal = () => {
        this.setState({open: false});
    };

    handleRemove = () => {
        this.closeModal();
        this.setState((prevState, props) => {
            this.deleteQuestionary(prevState.currentItem);
        });
    };

    render() {
        return (
            <div>
                <ModalContainer>
                    <Modal open={this.state.open} title={"Eliminar cuestionario"}
                           message={"Está seguro de eliminar el cuestionario?"}
                           handleConfirm={this.handleRemove} handleCancel={this.closeModal}>
                    </Modal>
                </ModalContainer>
                <Title tilte={'Lista de Encuestas'}
                       subtitle={'En esta sección podrás encontrar la lista de encuestas disponibles.'}/>
                <Toolbar className="toolbarFullWidth">
                    <div>
                        <Link to={{pathname: '/Questionaries/New'}}>
                            <Button label="Nuevo"
                                    onClick={() => {
                                        this.changeIdQuestionaryClick(new this.QuestionSelected(null, "NEW"))
                                    }}/>
                        </Link>
                    </div>
                </Toolbar>
                <Messages ref={(el) => this.messages = el}/>
                <br/>
                <ScrollPanel style={{width: '100%', height: '750px', margin: '5px'}} className="custom">
                    {
                        this.props.questionnaires.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Card title={item.name}>
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
                                </div>
                            )
                        })
                    }
                </ScrollPanel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    questionnaires: getQuestionnaries(state),
});

const mapDispatchToProps = dispatch => ({
    changeIdQuestionarySelected: value => dispatch(changeIdExistingQuestionary(value)),
    fetchGetQuestionaries: () => dispatch(fetchGetQuestionaries()),
    deleteQuestionnaire: value => dispatch(deleteQuestionnaire(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaires);
