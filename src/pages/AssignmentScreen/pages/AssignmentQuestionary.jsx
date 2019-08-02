import React, {Component} from 'react';
import MobileSellerList from '../../AssignmentSeller/pages/MobileSellerList/MobileSellerList';
import {Col, Row} from 'react-flexbox-grid';
import './styles.scss';
import '../../../layout/layout.css';
import {Button} from "primereact/button";
import {Messages} from 'primereact/messages';
import Toolbar from "@material-ui/core/Toolbar";
import {connect} from 'react-redux';
import MobileSellerListAssigment
    from "../../AssignmentSeller/pages/MobileSellerList/components/MobileSellerAssignment/MobileSellerListAssigment";
import {
    addAssignementUser,
    deleteAllAssignementUser,
    deleteAssignementUser,
    deleteMobileSellers,
    editQueryTextAssignedQuestionary
} from '../../../actions/index';
import {Calendar} from '../../../../node_modules/primereact/calendar';
import {
    getAllCity,
    getMobileAssignement,
    getMobileSellers,
    getMobileSellersAssigmentAux,
    getMobileSellersAux,
    getTypeByCodSapQuestionerQuestionary,
    getTypesSeller,
    getUser
} from "../../../reducers";
import Constants from "../../../Constants";
import {withStyles} from '@material-ui/core/styles';
import SearchAdvancedSeller from "../../../components/SearchAdvancedSeller";
import {
    addAllAssignementUser,
    deleteSaveMobileSellerAssignedListAux,
    deleteSaveMobileSellerListAux,
    removeAllAssignmentUser
} from "../../../actions";
import ModalContainer from "../../../components/modal/pages/modal";
import Modal from "../../../components/modal/components/modal";
import Title from "../../Title/Title";
import {getQuetionnaireById, saveAssignment} from "../../../actions/indexthunk";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from "react-router-dom/es/Link";
import {assigmentRoute} from "../../../routes/PathRoutes";

const styles = theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15)
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20
	},
	details: {
		alignItems: 'center'
	},
	column: {
		flexBasis: '33.33%'
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
});

class AssignmentQuestionary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			idQuestionary: null,
			questionerQuestionaryList: [],
			dates2: null,
			expandFirstSellerSearch: false,
			expandSecondSearch: false,
			hasNewAssignments: false,
			open: false,
			openConfirmMessage: false,
			questionaryRanges: [],
			routeOpen: false,
			routes: [],
			questionary: null
		};
	}

	QuestionQuestionaries(mobileSeller, questionary, initialDate, finalDate, status, user) {
		const format = require('date-format');
		this.id = null;
		this.mobileSeller = mobileSeller;
		this.questionary = questionary;
		this.status = status;
		this.initialDate = format("yyyy-MM-dd hh:mm:ss", finalDate);
		this.finalDate = format("yyyy-MM-dd hh:mm:ss", initialDate);
		this.sociedadId = "BOB1";
		this.usuarioId = user;
		this.operacionId = 1;
		this.fechaId = null;
	}

	alredyHasAssignment = (seller) => {
		const {questionerQuestionaryList} = this.state;
		let assignments = questionerQuestionaryList.filter((assignment) => (assignment.mobileSeller.id === seller.id && assignment.operacionId === 1));
		return assignments.length > 0;
	};

	handleSaveAssignment = () => {
		const {questionerQuestionaryList} = this.state;
		if (this.props.mobileSellersAssigmentAux.length === 0) {
			if (questionerQuestionaryList.length > 0) {
				this.openModal();
			} else {
				this.showWarning("", "Debe tener al menos un vendedor para guardar la asignacion");
			}
		} else {
			if (this.state.hasNewAssignments && this.state.dates2 == null) {
				this.showWarning('Seleccione un rango de fechas', '');
			} else {
				this.openModal();
			}
		}
	};

    componentDidMount() {
        this.props.getQuetionnaireById(this.props.idQuestionary)
            .then((data) => {
                this.setState({questionary: data});
            });
    }

	saveAssignments = () => {
		this.closeModal();
		const {questionerQuestionaryList} = this.state;
		for (let seller of this.props.mobileSellersAssigmentAux) {
			if (!this.alredyHasAssignment(seller)) {
				const questionQuestionary = new this.QuestionQuestionaries(seller, this.state.questionary,
					this.state.dates2[1], this.state.dates2[0], this.props.typeQuestionerQuestionary[0],
					this.props.user.username);
				questionerQuestionaryList.push(questionQuestionary);
			}
		}
		this.props.saveAssignment(questionerQuestionaryList)
			.then((response) => {
                switch (response) {
                    case "OK":
                        this.cancelAssignamentSeller();
                        this.props.showSuccess("", "La asignación se realizó exitosamente.");
                        this.handleBackClick();
                        break;
                    case "ERROR":
                        this.showError("", "Error al guardar");
                        break;
                    default:
                        break;
				}
			});
	};

    handleBackClick = () => {
        this.props.history.goBack();
    };

	cancelAssignamentSeller = () => {
		this.setState({openConfirmMessage: false});
		this.props.deleteAllAssignementUser();
		this.props.deleteMobileSeller(null);
		this.props.deleteSaveMobileSellerListAux(null);
		this.props.deleteSaveMobileSellerAssignedListAux(null);
	};

	loadAssignments = (assignments) => {
		assignments.forEach((assignment) => {
			const {questionerQuestionaryList} = this.state;
			questionerQuestionaryList.push(assignment);
			const mobileSeller = assignment.mobileSeller;
			this.handleAddSeller(mobileSeller);
		});
	};

	getAssignment = (seller) => {
		let res = null;
		const {questionerQuestionaryList} = this.state;
		let assignments = questionerQuestionaryList.filter((assignment) => {
			return assignment.mobileSeller.id === seller.id && assignment.operacionId === 1;
		});
		if (assignments.length > 0)
			res = assignments[0];
		return res;
	};

	handleDeleteSeller = (seller) => {
		this.props.deleteAssignementUser(seller);
	};

	handleAddSeller = (seller) => {
		if (!this.alredyHasAssignment(seller)) {
			this.setState({hasNewAssignments: true});
		}
		this.props.addAssignementUser(seller);
	};

	deleteAssignement = (seller) => {
		const {questionerQuestionaryList} = this.state;
		questionerQuestionaryList.forEach((assignment) => {
			if (assignment.id != null && assignment.operacionId === 1 && assignment.mobileSeller.id === seller.id) {
				assignment.operacionId = 0;
			}
		});
		this.handleDeleteSeller(seller);
	};

	showRoutes = (items) => {
		this.setState((prevState, props) => ({routeOpen: true, routes: items}));
	};

	assignAllSeller = () => {
		let sellers = [];
		let changeHasNewAssignments = false;
		this.props.mobileSellersAux.forEach((mobileSeller) => {
			if (!this.alredyHasAssignment(mobileSeller)) {
				changeHasNewAssignments = true;
			}
			sellers.push(mobileSeller);
		});
		this.props.addAllAssignementUser(sellers);
		if (changeHasNewAssignments === true) {
			this.setState({hasNewAssignments: true});
		}
	};

	unassignAllSeller = () => {
		let sellersAssignement = [];
		this.props.mobileSellersAssigmentAux.forEach((mobileSeller) => {
			const {questionerQuestionaryList} = this.state;
			questionerQuestionaryList.forEach((assignment) => {
				if (assignment.id != null && assignment.operacionId === 1 && assignment.mobileSeller.id === mobileSeller.id) {
					assignment.operacionId = 0;
				}
			});
			sellersAssignement.push(mobileSeller);
		});
		this.props.removeAllAssignmentUser(sellersAssignement);
	};

	openModal = () => {
		this.setState({open: true});
	};

	closeModal = () => {
		this.setState({open: false});
	};

	showWarning(title, detail) {
		this.messages.show({severity: 'warn', summary: title, detail: detail});
	}

	componentWillUnmount() {
		this.setState({date2: null});
		this.cancelAssignamentSeller();
	}

	handleClose = () => {
		this.setState({routeOpen: false});
		this.setState({routes: []});
	};

	renderRoutes() {
		return (
			<Dialog
				open={this.state.routeOpen}
				onClose={this.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title"
				             className="titleBody">
					<h1 className="dialogTitle">{"Rutas asignadas al Vendedor Movil"}</h1>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" className="dialogBody">
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button label="Cerrar" icon="pi pi-times" onClick={this.handleClose}
					        className="ui-button-success"/>
				</DialogActions>
			</Dialog>
		);
	}

	render() {
		const idQuestionary = this.props.idQuestionary;
		const es = {
			firstDayOfWeek: 1,
			dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
			dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
			dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
			monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
			monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
		};
		return (
			<div>
				<Title title={'Asignación de Cuestionarios'}
				       subtitle={'En esta sección podrás asignar tus cuestionarios a una o varias personas encargadas de realizar la encuesta.'}/>
				<ModalContainer>
					<Modal open={this.state.open} title={"Asignacion"}
					       message={"Está seguro de completar la asignación?"}
					       handleConfirm={this.saveAssignments}
					       handleCancel={this.closeModal}>
					</Modal>
				</ModalContainer>
				<Toolbar className="toolbarFullWidth">
					<div>
                        <Link to={assigmentRoute}>
						    <Button label="Cancelar" className="ui-button-danger"
						            onClick={() => {
						    	        this.cancelAssignamentSeller();
						            }}
						            style={{margin: '5px', verticalAlign: 'left'}}/>
                        </Link>
						<Calendar value={this.state.dates2}
						          onChange={(e) => this.setState({dates2: e.value})}
						          selectionMode="range" readOnlyInput="true" locale={es}
						          placeholder='Rango de fechas'/>

                            <Button label="Completar Asignacion"
                                    onClick={() => {
                                        this.handleSaveAssignment();
                                    }}
                                    style={{margin: '5px', verticalAlign: 'middle'}}/>

                        <Button label="Asignar todos"
                                onClick={() => {
                                    this.assignAllSeller();
                                }}
                                style={{margin: '5px', verticalAlign: 'middle'}}/>

                        <Button label="Quitar Todas las Asignaciones"
                                className="ui-button-danger"
                                onClick={() => {
                                    this.unassignAllSeller();
                                }}
                                style={{margin: '5px', verticalAlign: 'left'}}/>
                    </div>
                </Toolbar>
                <Messages ref={(el) => this.messages = el}/>
                <div>
                    {this.renderRoutes}
                </div>
                <br/>
                {
                    this.props.idQuestionary ?
                        <div>
                            <Row>
                                <Col xs>

                                    <SearchAdvancedSeller typeSearch={Constants.TYPE_SEARCH_MOBILE_SELLER}
                                                          idQuestionary={idQuestionary}/>
                                    <MobileSellerList idQuestionary={idQuestionary}
                                                      isEdit={false}
                                                      getAssignment={this.getAssignment}
                                                      handleAddSeller={this.handleAddSeller}
                                                      showRoutes={this.showRoutes}/>
                                </Col>

								<Col xs>

                                    <SearchAdvancedSeller typeSearch={Constants.TYPE_SEARCH_MOBILE_SELLER_ASSIGNED}
                                                          idQuestionary={idQuestionary}/>
                                    <MobileSellerListAssigment idQuestionary={idQuestionary}
                                                               isEdit={true}
                                                               loadAssignments={this.loadAssignments}
                                                               deleteAssignement={this.deleteAssignement}
                                                               getAssignment={this.getAssignment}
                                                               showRoutes={this.showRoutes}/>
                                </Col>
                            </Row>


						</div>
						: null

				}

			</div>
		);
	}
}

const mapStateToProps = state => ({
	assignmentUser: getMobileAssignement(state),
	mobileSellers: getMobileSellers(state),
	typeQuestionerQuestionary: getTypeByCodSapQuestionerQuestionary(state, Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN),
	querySearchView: state.queryMobileSeller,
	user: getUser(state),
	typeSeller: getTypesSeller(state),
	cities: getAllCity(state),
	mobileSellersAux: getMobileSellersAux(state),
	mobileSellersAssigmentAux: getMobileSellersAssigmentAux(state)
});

const mapDispatchToProps = dispatch => ({
	addAssignementUser: value => dispatch(addAssignementUser(value)),
	addAllAssignementUser: value => dispatch(addAllAssignementUser(value)),
	deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
	deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
	deleteMobileSeller: value => dispatch(deleteMobileSellers(value)),
	deleteSaveMobileSellerListAux: value => dispatch(deleteSaveMobileSellerListAux(value)),
	deleteSaveMobileSellerAssignedListAux: value => dispatch(deleteSaveMobileSellerAssignedListAux(value)),
	removeAllAssignmentUser: value => dispatch(removeAllAssignmentUser(value)),
	editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
	saveAssignment: value => dispatch(saveAssignment(value)),
    getQuetionnaireById: value => dispatch(getQuetionnaireById(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AssignmentQuestionary));
