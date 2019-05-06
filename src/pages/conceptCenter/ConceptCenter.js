import React, {Component} from 'react';
import JsxStyles from '../../styles/JsxStyles';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import Title from "../Title/Title";
import {Messages} from 'primereact/messages';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {deleteConceptServerBi, getAllConceptsBi} from "../../actions/indexthunk";
import {connect} from 'react-redux';
import DeleteDialog from "./dialogs/DeleteDialog";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import ConceptForm from "./dialogs/ConceptForm";
import {getConcepts} from "../../reducers";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    fab: {
        top: 'auto',
        right: '20px',
        bottom: '20px',
        left: 'auto',
        position: 'fixed !important'
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500]
    }
});

class ConceptCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Lista de Conceptos",
            subtitle: "",
            currentItem: -1,
            updateView: true,
            concepts: [],
            concept: null,
            filter: null,
            deleteOpen: false,
            toDelete: null,
            conceptOpen: false,
        };
    }

    componentDidMount() {
        this.chargeList();
    }

    shouldComponentUpdate(next_props, next_state, nextContext) {
        const {responseRequest} = next_props.reducer;
        console.log(responseRequest, next_props.reducer);
        if (responseRequest && responseRequest !== null) {
            if (responseRequest.codeResult >= 0) {
                this.showResponse(responseRequest.codeResult);
                this.chargeList()
            }
        }
        return true
    }

    showSuccess = (title, message) => {
        this.messages.show({life: 5000, severity: 'success', summary: title, detail: message});
    };

    showInfo = (title, message) => {
        this.messages.show({life: 5000, severity: 'info', summary: title, detail: message});
    };

    showWarn = (title, message) => {
        this.messages.show({life: 5000, severity: 'warn', summary: title, detail: message});
    };

    showError = (title, message) => {
        this.messages.show({life: 5000, severity: 'error', summary: title, detail: message});
    };

    showResponse = (response) => {
        if (response === 1)
            this.showSuccess('Procesado', 'La transacción se realizó correctamente');
        else if (response === 3)
            this.showWarn('No Procesado', 'El concepto no se guardo porque ya existe uno registrado con similares datos');
        else
            this.showError('Error', 'Ocurrió un error al procesar la transacción');

    };

    chargeList = () => {
        this.props.getAllConcepts()
            .then((data) => {
                this.setState(() => ({
                    concepts: data
                }));
            });
    };

    handleDeleteClick = (event, id) => {
        this.showWarn('Alerta', 'esta iniciando una funcion de eliminación');
        this.setState({deleteOpen: true});
        this.setState({toDelete: id});
    };

    handleDelete = () => {
        this.deleteConcept();
    };

    deleteConcept = () => {
        this.props.deleteConcept(this.state.toDelete)
            .then((result) => {
                if (result === "ERROR") {
                    this.showError('Error', 'No se pudo eliminar la segmentación');
                } else {
                    this.chargeList();
                    this.handleClose();
                    if (result !== undefined || result !== null)
                        this.showSuccess('Eliminado', 'Se elimino una segmentación');
                }
            });
    };

    handleClose = () => {
        this.setState({deleteOpen: false});
        this.setState({toDelete: null});
        this.chargeList();
    };

    renderDeleteDialog() {
        return (
            <DeleteDialog deleteOpen={this.state.deleteOpen} handleClose={this.handleClose}
                          handleDelete={this.handleDelete}/>
        );
    }

    handleConcept = (event, id) => {
        this.setState({concept: id});
        this.setState({conceptOpen: true});
    };

    handleCloseConcept = (response) => {
        this.setState({conceptOpen: false});
        if (response === 0)
            this.chargeList();
    };

    renderConceptDialog() {
        return (
            <ModalGeneric open={this.state.conceptOpen} onClose={this.handleCloseConcept}>
                <ConceptForm
                    concept={this.state.concept}
                    onClose={this.handleCloseConcept}
                />
            </ModalGeneric>
        );
    }

    renderList() {
        const {classes} = this.props;
        const {concepts} = this.props.reducer;
        return (
            <div>{
                concepts == null ? [] : concepts.map((item) => {
                    return (
                        <div style={{marginTop: '1em'}}>
                            <Card key={item.id}>
                                <CardContent>
                                    <div className="row between-xs" style={{marginRight: '1em'}}>
                                        <div className="col-auto">
                                            <div className="box">
                                                <h1 className='titleA'> {item.id}</h1>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <h2 className='titleB'>{item.abbreviation}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-auto">
                                            <div className="box">
                                                <label
                                                    className='label'>{item.name}</label>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <div className="row between-xs" style={{padding: '0.5em'}}>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button variant="contained" color="primary" className={classes.button}
                                                        onClick={event => this.handleConcept(event, item)}>
                                                    <EditIcon className={classes.leftIcon}/>
                                                    Editar
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="box">
                                                <Button variant="contained" color="secondary" className={classes.button}
                                                        onClick={event => this.handleDeleteClick(event, item.id)}>
                                                    <DeleteIcon className={classes.leftIcon}/>
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardActions>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        const {classes} = this.props;
        const fab = {
            color: "primary",
            className: classes.fab,
            icon: <AddIcon/>
        };
        return (
            <div>
                <div>
                    {this.renderDeleteDialog()}
                    {this.renderConceptDialog()}
                </div>
                <div>
                    <Title tilte={this.state.title} subtitle={this.state.subtitle}/>
                    <Messages ref={(el) => this.messages = el}/>
                </div>
                <div>
                    {this.renderList()}
                    <Button variant="fab" className={fab.className} color={fab.color}
                            onClick={event => this.handleConcept(event, 0)}>
                        {fab.icon}
                    </Button>
                </div>
            </div>
        );
    }
}

ConceptCenter.propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    reducer: getConcepts(state) //no tocar
});

const mapDispatchToProps = dispatch => ({
    getAllConcepts: () => dispatch(getAllConceptsBi()),
    deleteConcept: (id) => dispatch(deleteConceptServerBi(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, JsxStyles)(ConceptCenter));