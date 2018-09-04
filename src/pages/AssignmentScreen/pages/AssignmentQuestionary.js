import React, {Component} from 'react';
import MobileSellerList from '../../AssignmentSeller/pages/MobileSellerList/MobileSellerList';
import {Col, Row} from 'react-flexbox-grid';
import './styles.css';
import QuestionaryAsignmet from "../../AssignmentSeller/pages/QuestionaryAssigment/QuestionaryAsignmet";
import {Button} from "../../../../node_modules/primereact/button";
import {Toolbar} from '../../../../node_modules/primereact/toolbar';
import {connect} from 'react-redux';
import MobileSellerListAssigment
    from "../../AssignmentSeller/pages/MobileSellerList/components/MobileSellerAssignment/MobileSellerListAssigment";
import {
    deleteAllAssignementUser,
    deleteMobileSellers,
    editQueryTextAssignedQuestionary,
    editQueryTextMobileSellerAssignedList,
    addAssignementUser, 
    deleteAssignementUser
} from '../../../actions/index';
import {Calendar} from '../../../../node_modules/primereact/calendar';
import {getMobileAssignement, getTypeByCodSap, getUser} from "../../../reducers";
import Constants from "../../../Constants";
import {InputText} from 'primereact/inputtext';
import {editQueryTextMobileSellerList} from "../../../actions";


class AssignmentQuestionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
            questionerQuestionaryList: [],
            dates2: null,
            hasNewAssignments: false,
        }
    }

    QuestionQuestionaries(mobileSeller, questionary, initialDate, finalDate, status, user) {
        const format = require('date-format');
        this.id = null;
        this.mobileSeller = mobileSeller;
        this.questionary = questionary;
        this.status = status;
        this.initialDate = format("yyyy-MM-dd hh:mm:ss", finalDate);
        this.finalDate = format( "yyyy-MM-dd hh:mm:ss", initialDate);
        this.sociedadId = "BOB1";
        this.usuarioId = user;
        this.operacionId = 1;
        this.fechaId = null;
    }

    alredyHasAssignment = (seller) => {
        const {questionerQuestionaryList} = this.state;
        let assignments = questionerQuestionaryList.filter((assignment) => (assignment.mobileSeller.id == seller.id && assignment.operacionId == 1));
        return assignments.length > 0;
    }

    handleSaveAssignment = () => {
        const {questionerQuestionaryList} = this.state;
        if (this.props.assignmentUser.entities.length == 0){
            if(questionerQuestionaryList.length > 0){
                this.saveAssignments();
            }else{
                alert('Debe tener al menos un vendedor para guardar la asignacion');
            }
        }else{
            if(this.state.hasNewAssignments && this.state.dates2 == null){
                alert('Seleccione un rango de fechas');
            }else{
                this.saveAssignments();
            }
        }
    };

    saveAssignments = () => {
        const {questionerQuestionaryList} = this.state;
        for (let seller of this.props.assignmentUser.entities){
            if (!this.alredyHasAssignment(seller)){
                const questionQuestionary = new this.QuestionQuestionaries(seller, this.state.idQuestionary,
                    this.state.dates2[1], this.state.dates2[0], this.props.typeQuestionerQuestionary[0],
                    this.props.user.username);
                questionerQuestionaryList.push(questionQuestionary);
            }
        }
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.ASSING_QUESTIONARIES}`;
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(questionerQuestionaryList),
            headers:{
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json().then(data => {
            this.cancelAssignamentSeller();
            })
        )
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    handleSelectedQuestionary = idQuestionary => {
        console.log(idQuestionary);
        this.setState({idQuestionary: idQuestionary})
    };

    cancelAssignamentSeller = () => {
        this.props.deleteAllAssignementUser();
        this.props.deleteMobileSeller(null);
        this.setState({idQuestionary: null})
    };

    handleDeleteAllSellerAssignment = () => {
        this.props.deleteAllAssignementUser();
    };

    handleAddSeller = (seller) => {
        if(!this.alredyHasAssignment(seller)){
            this.setState({hasNewAssignments: true});
        }
        this.props.addAssignementUser(seller);
    };

    loadAssignments = (assignments) => {
        assignments.forEach((assignment) => {
            const {questionerQuestionaryList} = this.state;
            questionerQuestionaryList.push(assignment); 
            const mobileSeller = assignment.mobileSeller;
            this.handleAddSeller(mobileSeller);
        });
    };
    
    handleDeleteSeller = (seller) => {
        const {questionerQuestionaryList} = this.state;
        this.props.deleteAssignementUser(seller);
    };

    deleteAssignement = (seller) => {
        const {questionerQuestionaryList} = this.state;
        questionerQuestionaryList.forEach((assignment)=>{
            if(assignment.id != null && assignment.operacionId == 1 && assignment.mobileSeller.id == seller.id){
                assignment.operacionId = 0;
            }
        });  
        this.handleDeleteSeller(seller);    
    }

    getAssignment = (seller) => {
        let res = null;
        const {questionerQuestionaryList} = this.state;
        let assignments = questionerQuestionaryList.filter((assignment) => {
            return assignment.mobileSeller.id == seller.id && assignment.operacionId == 1});
        if (assignments.length > 0)
            res = assignments[0];
        return res;
    }

    render() {
        const {idQuestionary} = this.state;
        console.log(this.props.user);
        const es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
        };
        return (
            <div className="bodyContainer">
                {
                    !idQuestionary ?
                        <div xs>
                            <InputText value={this.state.value1} onChange={(e) => this.props.editQueryTextAssignedQuestionary(e.target.value)} />
                            <QuestionaryAsignmet onSelectedQuestionary={this.handleSelectedQuestionary}/>
                        </div> : null
                }

                {
                    idQuestionary ?
                        <div xs>
                            <Row>
                                <Col xs>
                                    <InputText value={this.state.value1} onChange={(e) => this.props.editQueryTextMobileSellerList(e.target.value)} />
                                    <MobileSellerList idQuestionary={this.state.idQuestionary.id} isEdit={false} getAssignment={this.getAssignment} handleAddSeller={this.handleAddSeller}/>
                                </Col>
                                <Col xs>
                                    <InputText value={this.state.value1} onChange={(e) => this.props.editQueryTextMobileSellerAssignedList(e.target.value)} />
                                    <MobileSellerListAssigment idQuestionary={this.state.idQuestionary.id} isEdit={true} loadAssignments={this.loadAssignments} 
                                    deleteAssignement={this.deleteAssignement} getAssignment={this.getAssignment}/>
                                </Col>
                            </Row>

                            <Col>
                                {
                                    idQuestionary ?
                                        <Toolbar>
                                            <div className="p-toolbar-group-left">
                                                <Button label="Cancelar" className="ui-button-danger"
                                                        onClick={() => {
                                                            this.cancelAssignamentSeller()
                                                        }}
                                                        style={{margin: '5px', verticalAlign: 'left'}}/>

                                                <Calendar value={this.state.dates2} onChange={(e) => this.setState({dates2: e.value})} selectionMode="range" readonlyInput={true} locale={es} />

                                                <Button label="Asignar"
                                                        onClick={() => {
                                                            this.handleSaveAssignment()
                                                        }}
                                                        style={{margin: '5px', verticalAlign: 'middle'}}/>
                                            </div>
                                        </Toolbar> :
                                        null
                                }
                            </Col>
                        </div> :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    assignmentUser: getMobileAssignement(state),
    typeQuestionerQuestionary: getTypeByCodSap(state, Constants.CODSAP_QUESTIONER_QUESTIONARY_OPEN),
    querySearchView: state.queryMobileSeller,
    user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
    addAssignementUser: value => dispatch(addAssignementUser(value)),
    deleteAssignementUser: value => dispatch(deleteAssignementUser(value)),
    deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
    deleteMobileSeller: value => dispatch(deleteMobileSellers(value)),
    editQueryTextMobileSellerList: value => dispatch(editQueryTextMobileSellerList(value)),
    editQueryTextMobileSellerAssignedList: value => dispatch(editQueryTextMobileSellerAssignedList(value)),
    editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentQuestionary);