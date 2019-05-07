import React, {Component} from 'react';
import {getCreateTypes} from "../../reducers";
import {connect} from 'react-redux';
import {deleteTypeServerBi, getAllTypesServerBi} from "../../actions/indexthunk";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import {Messages} from 'primereact/messages';
import {withStyles} from "@material-ui/core";
import JsxStyles from "../../styles/JsxStyles";
import green from "@material-ui/core/colors/green";
import PropTypes from "prop-types";
import Title from "../Title/Title";
import DeleteDialog from "../conceptCenter/dialogs/DeleteDialog";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import TypeForm from "./dialogs/TypeForm";

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

class TypeCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Lista de Tipos",
            subtitle: "Tipos del sistema",
            currentItem: -1,
            updateView: true,
            types: [],
            type: null,
            filter: null,
            deleteOpen: false,
            toDelete: null,
            typeOpen: false,
        }
    }

    componentWillMount() {
        this.chargeList();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {responseRequest} = nextProps.reducerVariable;
        if (responseRequest !== null) {
            const {codeResult} = responseRequest;
            this.showResponse(codeResult);
            this.chargeList();
        }
        return true;
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
            this.showWarn('No Procesado', 'El tipo no se guardo porque ya existe uno registrado con similares datos');
        else
            this.showError('Error', 'Ocurrió un error al procesar la transacción');

    };

    chargeList = () => {
        this.props.getAllTypes()
            .then((data) => {
                this.setState(() => ({
                    types: data
                }));
            });
    };

    handleDeleteClick = (event, id) => {
        this.showWarn('Alerta', 'esta iniciando una funcion de eliminación');
        this.setState({deleteOpen: true});
        this.setState({toDelete: id});
    };

    handleDelete = () => {
        this.deleteType();
    };

    deleteType = () => {
        this.props.deleteType(this.state.toDelete)
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

    handleType = (event, id) => {
        this.setState({type: id});
        this.setState({typeOpen: true});
    };

    handleCloseType = (response) => {
        this.setState({typeOpen: false});
        if (response >= 0)
            this.chargeList();
    };

    renderDeleteDialog() {
        return (
            <DeleteDialog deleteOpen={this.state.deleteOpen} handleClose={this.handleClose}
                          handleDelete={this.handleDelete}/>
        );
    }

    renderTypeDialog() {
        return (
            <ModalGeneric open={this.state.typeOpen} onClose={this.handleCloseType}>
                <TypeForm
                    type={this.state.type}
                    onClose={this.handleCloseType}
                />
            </ModalGeneric>
        );
    }

    renderList() {
        const {classes} = this.props;
        const {types} = this.props.reducerVariable;
        console.log(types);
        return (
            <div>
                {
                    types === null ? [] : types.map((item) => {
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
                                                    <b>Nombre: </b>
                                                    <label
                                                        className='label'>{item.name}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="box">
                                                    <b>Codigo Tipo: </b>
                                                    <label
                                                        className='label'>{item.codeType}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="box">
                                                    <b>Id Concepto: </b>
                                                    <label
                                                        className='label'>{item.idConcept}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <div className="row between-xs" style={{padding: '0.5em'}}>
                                            <div className="col-auto">
                                                <div className="box">
                                                    <Button variant="contained" color="primary"
                                                            className={classes.button}
                                                            onClick={event => this.handleType(event, item)}>
                                                        <EditIcon className={classes.leftIcon}/>
                                                        Editar
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="box">
                                                    <Button variant="contained" color="secondary"
                                                            className={classes.button}
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
        };
        return (
            <div>
                <div>
                    {this.renderDeleteDialog()}
                    {this.renderTypeDialog()}
                </div>
                <div>
                    <Title tilte={this.state.title} subtitle={this.state.subtitle}/>
                    <Messages ref={(el) => this.messages = el}/>
                </div>
                <div>
                    <div>
                        {this.renderList()}
                    </div>
                    <Button variant="fab" className={fab.className} color={fab.color}
                            onClick={event => this.handleType(event, 0)}>
                        <AddIcon/>
                    </Button>
                </div>
            </div>
        );
    }
}

TypeCenter
    .propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    reducerVariable: getCreateTypes(state) //no tocar
});

const
    mapDispatchToProps = dispatch => ({
        getAllTypes: () => dispatch(getAllTypesServerBi()),
        deleteType: (id) => dispatch(deleteTypeServerBi(id)),
    });

export default connect(mapStateToProps, mapDispatchToProps)

(
    withStyles(styles, JsxStyles)

    (
        TypeCenter
    ))
;