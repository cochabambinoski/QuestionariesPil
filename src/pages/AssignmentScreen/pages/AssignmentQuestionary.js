import React, {Component} from 'react';
import MobileSellerList from '../../AssignmentSeller/pages/MobileSellerList/MobileSellerList';
import {Col, Row} from 'react-flexbox-grid';
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
import {getMobileAssignement, getTypeByCodSap} from "../../../reducers";
import Constants from "../../../Constants";

class AssignmentQuestionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idQuestionary: null,
            questionerQuestionaryList: [],
            dates2: null
        }
    }

    QuestionQuestionaries(mobileSeller, questionary, initialDate, finalDate, status) {
        const format = require('date-format');
        this.id = null;
        this.mobileSeller = mobileSeller;
        this.questionary = questionary;
        this.status = status;
        this.initialDate = format("yyyy-MM-dd hh:mm:ss", finalDate);
        this.finalDate = format( "yyyy-MM-dd hh:mm:ss", initialDate);
        this.sociedadId = "BOB1";
        this.usuarioId = "admin";
        this.operacionId = 1;
        this.fechaId = null;
    }

    handleSaveAssignment = () =>{
        if (this.props.assignmentUser.entities.length > 0){
            if(this.state.dates2 != null){
                console.log(this.state.dates2);
                console.log(this.state.dates2[0]);
                console.log(this.state.dates2[1]);
                const {questionerQuestionaryList} = this.state;
                for (let seller of this.props.assignmentUser.entities){
                    const questionQuestionary = new this.QuestionQuestionaries(seller, this.state.idQuestionary,
                        this.state.dates2[1], this.state.dates2[0], this.props.typeQuestionerQuestionary[0]);
                    questionerQuestionaryList.push(questionQuestionary);
                    console.log(questionQuestionary);
                }
                let url = `${Constants.ROUTE_WEB_SERVICES}${Constants.ASSING_QUESTIONARIES}`;
                fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(questionerQuestionaryList),
                    headers:{
                        'Accept': '*/*',
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => res.json().then(data => {
                    console.log(data);
                    this.cancelAssignamentSeller();
                    })
                )
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response));
            } else {
                alert('Seleccione un rango de fechas');
            }
        } else {
            alert('debe tener al menos un vendedor para guardar la asignacion');
        }
    };

    handleSelectedQuestionary = idQuestionary => {
        console.log(idQuestionary);
        this.setState({idQuestionary: idQuestionary})
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
                                    <SearchMobileSeller idQuestionary={this.state.idQuestionary.id} />
                                    <MobileSellerList idQuestionary={this.state.idQuestionary.id} isEdit={false}/>
                                </Col>
                                <Col xs>
                                    <SearchMobileSeller/>
                                    <MobileSellerListAssigment idQuestionary={this.state.idQuestionary.id} isEdit={true}/>
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
});

const mapDispatchToProps = dispatch => ({
    deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentQuestionary);