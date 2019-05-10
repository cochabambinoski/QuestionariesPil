import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getExchangeRate} from "../../reducers";
import {
    createExchangeRateServerBi,
    deleteExchangeRateServerBi,
    getDataInitialExchangeRateServerBi,
    updateExchangeRateServerBi
} from "../../actions/indexthunk";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import {cleanRequestExchangeRateBi} from "../../actions";
import Paper from "@material-ui/core/es/Paper/Paper";
import {formatDateToString} from "../../utils/StringDateUtil";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import DialogCreateExchangeRate from "./components/DialogCreateExchangeRate";
import {Messages} from "primereact/messages";
import Title from "../Title/Title";

class ExchangeRate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            open: false,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: false
        }
    }

    createExchangeRateDispatch = (idDate, tc) => {
        this.setState({action: "create",});
        this.props.createExchangeRate(idDate, tc);
        this.handleCloseDialog();
    };

    updateExchangeRateDispatch = (idExchangeRate, idDate, tc) => {
        this.setState({action: "update",});
        this.props.updateExchangeRate(idExchangeRate, idDate, tc);
        this.handleCloseDialog();
    };

    deleteExchangeRateDispatch = (id) => {
        this.setState({action: "delete",});
        this.props.deleteExchangeRate(id);
        this.handleCloseDialog();
    };

    componentDidMount() {
        this.props.getDataInitial();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {exchangesRate} = this.props.reducerVariables;
        const {responseRequest} = nextProps.reducerVariables;
        if (responseRequest) {
            const {codeResult} = responseRequest;
            this.renderMessages(codeResult);
            this.props.getDataInitial();
            this.props.cleanExchangeRateStateReducer();
        }
        const {exChangeRate} = nextProps.reducerVariables;
        return exchangesRate !== exChangeRate
    }

    renderError(errorRequest) {
        return (
            <div>
                <h1>Error {errorRequest.status}</h1>
                <Button color={"primary"} variant={"contained"}
                        onClick={this.prop.cleanExchangeRateStateReducer}> Aceptar </Button>
            </div>
        )
    }

    renderMessages = (codeResult) => {
        const {action} = this.state;
        switch (action) {
            case "create":
                if (codeResult && codeResult === 1) {
                    this.messages.show({severity: 'success', summary: 'Creacion Completada'})
                } else if (codeResult && codeResult === 0) {
                    this.messages.show({severity: 'error', summary: 'Creacion Fallida'})
                } else if (codeResult && codeResult === 2) {
                    this.messages.show({severity: 'warn', summary: 'Cuenta ya existente'})
                }
                return;
            case "update":
                if (codeResult && codeResult === 1) {
                    this.messages.show({severity: 'success', summary: 'Actualizacion Completada'})
                } else if (codeResult && codeResult === 0) {
                    this.messages.show({severity: 'error', summary: 'Actualizacion Fallida'})
                } else if (codeResult && codeResult === 2) {
                    this.messages.show({severity: 'warn', summary: 'Combinacion ya existente'})
                }
                return;
            case "delete":
                if (codeResult && codeResult === 1) {
                    this.messages.show({severity: 'success', summary: 'Eliminacion Completada'})
                } else if (codeResult && codeResult === 0) {
                    this.messages.show({severity: 'error', summary: 'Eliminacion Fallida'})
                }
                return;
        }
    };

    renderModal = () => {
        const {item, openModalDelete, openModalCreate, openModalUpdate, openModalView} = this.state;
        const {accountsDimension, timeDimension} = this.props.reducerVariables;
        switch (true) {
            case openModalDelete:
                const {idExchangeRate} = item;
                return (
                    <div>
                        <div>
                            <Title title="Alerta" subtitle={this.state.subtitle}/>
                        </div>
                        <br/>
                        <div>
                            <b>¿Está seguro que desea eliminar este Tipo de cambio?</b>
                        </div>
                        <br/>
                        <div>
                            <Button style={{margin: 3}}
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={() => this.deleteExchangeRateDispatch(idExchangeRate)}>Eliminar</Button>
                            <Button style={{margin: 3}}
                                    variant={"contained"}
                                    color={"secondary"}
                                    onClick={this.handleCloseDialog}>Cancelar</Button>
                        </div>
                    </div>);
            case openModalCreate:
                return (
                    <div>
                        <DialogCreateExchangeRate actionDialog={"create"}
                                                  item={item}
                                                  accountDimension={accountsDimension}
                                                  timeDimension={timeDimension}
                                                  onClose={this.handleCloseDialog}
                                                  onClick={this.createExchangeRateDispatch}/>
                    </div>);
            case openModalUpdate:
                return (
                    <div>
                        <DialogCreateExchangeRate actionDialog={"update"}
                                                  item={item}
                                                  accountDimension={accountsDimension}
                                                  timeDimension={timeDimension}
                                                  onClose={this.handleCloseDialog}
                                                  onClick={this.updateExchangeRateDispatch}/>
                    </div>);
            case openModalView:
                return (
                    <div>
                        <DialogCreateExchangeRate actionDialog={"view"}
                                                  item={item}
                                                  accountDimension={accountsDimension}
                                                  timeDimension={timeDimension}
                                                  onClose={this.handleCloseDialog}/>
                    </div>);
            default:
                return null;
        }
    };

    render() {
        const {load, exchangesRate, errorRequest} = this.props.reducerVariables;
        if (errorRequest) {
            return this.renderError(errorRequest)
        }
        // noinspection ThisExpressionReferencesGlobalObjectJS
        return (
            <div>
                <Messages ref={(el) => this.messages = el}/>
                <ModalGeneric open={this.state.open} onClose={this.handleCloseDialog}>
                    {this.renderModal()}
                </ModalGeneric>
                {load ?
                    <CircularProgress/> : (
                        <div>
                            <Paper style={{marginTop: 5}}>
                                <Toolbar>
                                    <Button variant={"contained"}
                                            onClick={() => this.openModalCreateAccountPeriod()}
                                            color={"primary"}>Nuevo</Button>
                                </Toolbar>
                            </Paper>
                            {
                                exchangesRate && exchangesRate.length > 0 ?
                                    <List>
                                        {exchangesRate.map(item => {
                                            const {idExchangeRate, idDate} = item;
                                            return (
                                                <Paper style={{marginTop: 5}} key={idExchangeRate}>
                                                    <ListItem alignItems={"flex-start"}>
                                                        <Grid container direction={"column"}>
                                                            <ListItemText primary={"Id:" + idExchangeRate}/>
                                                            <ListItemText>{formatDateToString(idDate)}</ListItemText>
                                                            <ListItemText primary={"Tipo cambio: " + item.tc}/>
                                                            <Grid container>
                                                                <Button style={{margin: 3}}
                                                                        onClick={() => this.openModalViewAccountPeriod(item)}
                                                                        variant={"contained"}
                                                                        color={"primary"}>Ver</Button>
                                                                <Button style={{margin: 3}}
                                                                        onClick={() => this.openModalUpdateAccountPeriod(item)}
                                                                        variant={"contained"}
                                                                        color={"primary"}>Editar</Button>
                                                                <Button style={{margin: 3}}
                                                                        onClick={() => this.openModalDeleteAccountPeriod(item)}
                                                                        variant={"contained"}
                                                                        color={"secondary"}>Eliminar</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </Paper>
                                            )
                                        })}
                                    </List> : (
                                        <h1>No existen tipos de cambio creados</h1>
                                    )
                            }

                        </div>)

                }
            </div>
        );
    }

    openModalDeleteAccountPeriod = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: false,
            openModalDelete: true,
            openModalCreate: false,
            openModalUpdate: false
        })
    };

    openModalUpdateAccountPeriod = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: true
        })
    };

    openModalCreateAccountPeriod = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: true,
            openModalUpdate: false
        })
    };

    openModalViewAccountPeriod = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: true,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: false
        })
    };

    handleCloseDialog = () => {
        this.setState({
            item: null,
            open: false,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: false
        })
    };

}

const mapStateToProps = state => ({
    reducerVariables: getExchangeRate(state),
});

const mapDispatchToProps = dispatch => ({
    getDataInitial: () => dispatch(getDataInitialExchangeRateServerBi()),
    createExchangeRate: (idDate, tc) => dispatch(createExchangeRateServerBi(idDate, tc)),
    updateExchangeRate: (exchangeRateId, idDate, tc) => dispatch(updateExchangeRateServerBi(exchangeRateId, idDate, tc)),
    deleteExchangeRate: (id) => dispatch(deleteExchangeRateServerBi(id)),
    cleanExchangeRateStateReducer: () => dispatch(cleanRequestExchangeRateBi())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);
