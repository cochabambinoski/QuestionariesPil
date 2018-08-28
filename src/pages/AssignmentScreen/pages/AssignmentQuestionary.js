import React, {Component} from 'react';
import MobileSellerList from '../../AssignmentSeller/pages/MobileSellerList/MobileSellerList';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './styles.css';
import QuestionaryAsignmet from "../../AssignmentSeller/pages/QuestionaryAssigment/QuestionaryAsignmet";
import SearchMobileSeller
    from "../../AssignmentSeller/pages/MobileSellerList/components/SearchMobileSeller/SearchMobileSeller";
import SearchQuestionary
    from "../../AssignmentSeller/pages/QuestionaryAssigment/components/SearchQuestionary/SearchQuestionary";
import {Button} from "../../../../node_modules/primereact/button";
import {Toolbar} from '../../../../node_modules/primereact/toolbar';
import {connect} from 'react-redux';
import MobileSellerListAssigment
    from "../../AssignmentSeller/pages/MobileSellerList/components/MobileSellerAssignment/MobileSellerListAssigment";
import {deleteAllAssignementUser} from '../../../actions/index';
import {Calendar} from '../../../../node_modules/primereact/calendar';
import {getMobileAssignement} from "../../../reducers";
import moment from '../../../../node_modules/moment';
import Constants from "../../../Constants";

class AssignmentQuestionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
            questionerQuestionaryList: []
        }
    }

    QuestionQuestionaries(mobileSeller, questionary, initialDate, finalDate) {
        const msec = Date.parse("2012-March-21");
        this.id = null;
        this.mobileSeller = mobileSeller;
        this.questionary = questionary;
        this.status = 3;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.sociedadId = "BOB1";
        this.usuarioId = "admin";
        this.operacionId = 1;
        this.fechaId = new Date(msec).toDateString();
        // alert('Una instancia de questionQuestionaries');
    }

    handleSaveAssignment = () =>{
        const {questionerQuestionaryList} = this.state;
        for (let seller of this.props.assignmentUser.entities){
            const questionQuestionary = new this.QuestionQuestionaries(seller, this.state.idQuestionary, this.state.dates2, this.state.dates2);
            questionerQuestionaryList.push(questionQuestionary)
        }
        console.log(questionerQuestionaryList);
        for (let seller of questionerQuestionaryList){
            console.log(seller);
        }
        let strQQuestionaries = JSON.stringify(questionerQuestionaryList);
        let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.ASSING_QUESTIONARIES}?questionerQuestionaries=${encodeURIComponent(strQQuestionaries)}`;
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers:{
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        this.cancelAssignamentSeller
    };

    handleSelectedQuestionary = idQuestionary => {
        console.log(idQuestionary);
        this.setState({idQuestionary: idQuestionary.toString()})
    };

    cancelAssignamentSeller = () => {
        this.props.deleteAllAssignementUser();
        this.setState({idQuestionary: null})
    };

    handleDeleteAllSellerAssignment = () => {
        this.props.deleteAllAssignementUser();
    };

    render() {
        const {idQuestionary} = this.state;
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
                            <SearchQuestionary style={{elevation: '50px', with: '100%', height: '100%'}}/>
                            <QuestionaryAsignmet onSelectedQuestionary={this.handleSelectedQuestionary}/>
                        </div> : null
                }

                {
                    idQuestionary ?
                        <div xs>
                            <Row>
                                <Col xs>
                                    <SearchMobileSeller/>
                                    <MobileSellerList idQuestionary={this.state.idQuestionary} isEdit={false}/>
                                </Col>
                                <Col xs>
                                    <SearchMobileSeller/>
                                    <MobileSellerListAssigment idQuestionary={this.state.idQuestionary} isEdit={true}/>
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

const mapStateToProps = state => ({assignmentUser: getMobileAssignement(state)});

const mapDispatchToProps = dispatch => ({
    deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentQuestionary);