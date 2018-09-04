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
    editQueryTextMobileSellerAssignedList
} from '../../../actions/index';
import {Calendar} from '../../../../node_modules/primereact/calendar';
import {getAllCity, getMobileAssignement, getTypeByCodSap, getTypesSeller, getUser} from "../../../reducers";
import Constants from "../../../Constants";
import {InputText} from 'primereact/inputtext';
import {editQueryTextMobileSellerList} from "../../../actions";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import List from "@material-ui/core/List/List";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from "@material-ui/core/ListItem/ListItem";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
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

    handleSaveAssignment = () =>{
        if (this.props.assignmentUser.entities.length > 0){
            if(this.state.dates2 != null){
                console.log(this.state.dates2);
                console.log(this.state.dates2[0]);
                console.log(this.state.dates2[1]);
                const {questionerQuestionaryList} = this.state;
                console.log(this.props.user.username);
                for (let seller of this.props.assignmentUser.entities){
                    const questionQuestionary = new this.QuestionQuestionaries(seller, this.state.idQuestionary,
                        this.state.dates2[1], this.state.dates2[0], this.props.typeQuestionerQuestionary[0],
                        this.props.user.username);
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
        this.props.deleteMobileSeller(null);
        this.setState({idQuestionary: null})
    };

    handleDeleteAllSellerAssignment = () => {
        this.props.deleteAllAssignementUser();
    };

    handleSetStateFirstSellerSearch = () =>{
        console.log("Expanded");
      const isExpanded = this.state.expandFirstSellerSearch;
      if (isExpanded) {
          this.setState({expandFirstSellerSearch: false});
      } else {
          this.setState({expandFirstSellerSearch: true});
      }
    };

    handleSetStateSecondSellerSearch = () =>{
        console.log("Expanded");
        const isExpanded = this.state.expandSecondSearch;
        if (isExpanded) {
            this.setState({expandSecondSearch: false});
        } else {
            this.setState({expandSecondSearch: true});
        }
    };

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
        const {classes} = this.props;
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

                                    <ExpansionPanel expanded={this.state.expandFirstSellerSearch} >
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {this.handleSetStateFirstSellerSearch()}}  />} >
                                            <div className={classes.column}>
                                                <InputText value={this.state.value1} onChange={(e) => this.props.editQueryTextMobileSellerList(e.target.value)} />
                                            </div>
                                            <div className={classes.column}>
                                                <Typography className={classes.heading}>Vendedores Disponibles</Typography>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <Divider />
                                        <ExpansionPanelDetails className={classes.details}>

                                            <div className={classes.column}>
                                                <h2>Tipos de Usuario</h2>
                                                <List className={this.props.classes.root} subheader={<li />}>
                                                    {this.props.typeSeller.map(typeSeller => (
                                                        <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                                            <ListItemText primary={typeSeller.nombre } />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox

                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>

                                            <div className={classNames(classes.column, classes.helper)}>
                                                <h2>Ciudades</h2>
                                                <List className={this.props.classes.root} subheader={<li />}>
                                                    {this.props.cities.map(typeSeller => (
                                                        <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                                            <ListItemText primary={typeSeller.nombre } />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox

                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>

                                            <div className={classNames(classes.column, classes.helper)}>
                                                <h2>Sucursales</h2>
                                                <List className={this.props.classes.root} subheader={<li />}>
                                                    {this.props.typeSeller.map(typeSeller => (
                                                        <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                                            <ListItemText primary={typeSeller.nombre } />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox

                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <Divider />
                                        <ExpansionPanelActions>
                                            <Button label="Filtrar"/>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>

                                    <MobileSellerList idQuestionary={this.state.idQuestionary.id} isEdit={false}/>
                                </Col>

                                <Col xs>

                                    <ExpansionPanel expanded={this.state.expandSecondSearch}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {this.handleSetStateSecondSellerSearch()}} />} >
                                            <div className={classes.column}>
                                                <InputText value={this.state.value1} onChange={(e) => this.props.editQueryTextMobileSellerAssignedList(e.target.value)} />
                                            </div>
                                            <div className={classes.column}>
                                                <Typography className={classes.heading}>Vendedores Asignados</Typography>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <Divider />
                                        <ExpansionPanelDetails className={classes.details}>
                                            <div className={classes.column}>
                                                <h2>Tipos de Usuario</h2>
                                                <List className={this.props.classes.root} subheader={<li />}>
                                                    {this.props.typeSeller.map(typeSeller => (
                                                        <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                                            <ListItemText primary={typeSeller.nombre } />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox

                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>

                                            <div className={classNames(classes.column, classes.helper)}>
                                                <h2>Ciudades</h2>
                                                <List className={this.props.classes.root} subheader={<li />}>
                                                    {this.props.cities.map(typeSeller => (
                                                        <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                                            <ListItemText primary={typeSeller.nombre } />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox

                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>

                                            <div className={classNames(classes.column, classes.helper)}>
                                                <h2>Sucursales</h2>
                                                <List className={this.props.classes.root} subheader={<li />}>
                                                    {this.props.typeSeller.map(typeSeller => (
                                                        <ListItem key={typeSeller.id} dense button className={classes.listItem}>
                                                            <ListItemText primary={typeSeller.nombre } />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox

                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <Divider />
                                        <ExpansionPanelActions>
                                            <Button label="Filtrar"/>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>

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

                                                <Button label="Completar Asignacion"
                                                        onClick={() => {
                                                            this.handleSaveAssignment()
                                                        }}
                                                        style={{margin: '5px', verticalAlign: 'middle'}}/>

                                                <Button label="Asignar Todos"

                                                        style={{margin: '5px', verticalAlign: 'middle'}}/>
                                                <Button label="Desasignar Todos" className="ui-button-danger"

                                                        style={{margin: '5px', verticalAlign: 'left'}}/>
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
    typeSeller: getTypesSeller(state),
    cities: getAllCity(state)
});

const mapDispatchToProps = dispatch => ({
    deleteAllAssignementUser: value => dispatch(deleteAllAssignementUser()),
    deleteMobileSeller: value => dispatch(deleteMobileSellers(value)),
    editQueryTextMobileSellerList: value => dispatch(editQueryTextMobileSellerList(value)),
    editQueryTextMobileSellerAssignedList: value => dispatch(editQueryTextMobileSellerAssignedList(value)),
    editQueryTextAssignedQuestionary: value => dispatch(editQueryTextAssignedQuestionary(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AssignmentQuestionary));