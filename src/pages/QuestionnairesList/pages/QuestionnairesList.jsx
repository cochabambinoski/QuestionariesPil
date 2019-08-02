import React, {Component, Fragment} from 'react';
import Constants from './../../../Constants'
import './QuestionnairesList.scss';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
import {connect} from 'react-redux';
import {changeIdExistingQuestionary} from '../../../actions/index';
import {ScrollPanel} from "primereact/scrollpanel";
import Modal from "../../../components/modal/components/modal";
import ModalContainer from "../../../components/modal/pages/modal";
import Title from "../../Title/Title";
import Toolbar from "@material-ui/core/Toolbar";
import {closeQuestionnaire, deleteQuestionnaire, fetchGetQuestionariesByUser} from '../../../actions/indexthunk';
import {getQuestionnaries, getUser} from "../../../reducers";
import Link from "react-router-dom/es/Link";
import {
    questionariesEditIdRouteParam,
    questionariesNewRoute,
    questionariesShowIdRouteParam
} from "../../../routes/PathRoutes";

class Questionnaires extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: [],
            updateView: true,
            open: false,
            modal: false,
            currentItem: -1
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
		this.action = action;
	}

    componentDidMount() {
        this.getQuestionnaires();
        const title = this.props.title;
        const detail = this.props.detail;
        if (title !== null && detail !== null) {
            this.showSuccess(title, detail);
            this.props.showMessage(null, null);
        }
    }

    getQuestionnaires() {
        this.props.fetchGetQuestionariesByUser(this.props.user.id);
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

    closeQuestionary(item) {
        this.exitModal();
        this.props.closeQuestionary(item)
            .then((result) => {
                switch (result) {
                    case "CLOSED":
                        this.showSuccess("Cuestionario Cerrado");
                        this.getQuestionnaires();
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

	enterModal = (item) => {
		this.setState({currentItem: item});
		this.setState({modal: true});
	};

	closeModal = () => {
		this.setState({open: false});
	};

	exitModal = () => {
		this.setState({modal: false});
	};

	handleRemove = () => {
		this.closeModal();
		this.setState((prevState, props) => {
			this.deleteQuestionary(prevState.currentItem);
		});
	};

	handleClose = () => {
		this.closeModal();
		this.setState((prevState, props) => {
			this.closeQuestionary(prevState.currentItem);
		});
	};

    render() {
        return (
            <div>
                <Fragment>
                    <ModalContainer>
                        <Modal open={this.state.open} title={"Eliminar cuestionario"}
                               message={"Está seguro de eliminar el cuestionario?"}
                               handleConfirm={this.handleRemove} handleCancel={this.closeModal}>
                        </Modal>
                        <Modal open={this.state.modal} title={"Cerrar cuestionario"}
                               message={"Está seguro de cerrar el cuestionario?"}
                               handleConfirm={this.handleClose} handleCancel={this.exitModal}>
                        </Modal>
                    </ModalContainer>
                    <Title title={'Lista de Encuestas'}
                           subtitle={'En esta sección podrás encontrar la lista de encuestas disponibles.'}/>
                    <Toolbar className="toolbarFullWidth">
                        <div>
                            <Link to={questionariesNewRoute}>
                                <Button label="Nuevo"
                                        onClick={() => {
                                            this.changeIdQuestionaryClick(new this.QuestionSelected(null, "NEW"))
                                        }}/>
                            </Link>
                        </div>
                    </Toolbar>
                </Fragment>
                <Messages ref={(el) => this.messages = el}/>
                <br/>
                <ScrollPanel style={{width: '100vw - 100dp', height: '100vh', margin: '5px'}} className="custom">
                    {
                        this.props.questionnaires.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Card title={item.name}>
                                        <div className="text">
                                            <div>Creado por {item.usuarioId}</div>
                                            <div>{item.fechaId}</div>
                                            {
                                                item.status !== null ? item.status.codigoSap === Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN ?
                                                    <div className="open">Abierto</div> :
                                                    <div className="close">Cerrado</div> : null
                                            }
                                            <br/>
                                            <span>
                                                <Link to={`${questionariesShowIdRouteParam}${item.id}`}>
                                                    <Button label="Ver"
                                                            // onClick={() => {this.changeIdQuestionaryClick(new this.QuestionSelected(item, "SHOW"))}}
                                                    />
                                                </Link>

                                                <Link to={`${questionariesEditIdRouteParam}${item.id}`}>
                                                <Button label="Editar"
                                                        // onClick={() => {this.changeIdQuestionaryClick(new this.QuestionSelected(item, "EDIT"))}}
                                                />
                                                </Link>

                                                <Button label="Cerrar" onClick={() => {
                                                    this.enterModal(item);
                                                }}
                                                        disabled={item.status != null && item.status.codigoSap === Constants.CODSAP_QUESTIONER_QUESTIONARY_CLOSE}/>

                                                <Button label="Eliminar" className="ui-button-danger" onClick={() => {
                                                    this.openModal(item);
                                                }}/>

                                            </span>
                                        </div>
                                    </Card>
                                    <br/>
                                </div>
                            );
                        })
                    }
                </ScrollPanel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    questionnaires: getQuestionnaries(state),
    user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
    changeIdQuestionarySelected: value => dispatch(changeIdExistingQuestionary(value)),
    closeQuestionary: value => dispatch(closeQuestionnaire(value)),
    fetchGetQuestionariesByUser: user => dispatch(fetchGetQuestionariesByUser(user)),
    deleteQuestionnaire: value => dispatch(deleteQuestionnaire(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaires);
