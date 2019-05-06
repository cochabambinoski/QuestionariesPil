import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getOperatingAccounts} from "../../reducers";
import {
    createOperatingAccountServerBi, deleteOperatingAccountServerBi,
    getDataInitialOperatingAccountsServerBi,
    updateOperatingAccountServerBi
} from "../../actions/indexthunk";
import {cleanRequestOperatingAccountsBi} from "../../actions";
import Button from "@material-ui/core/es/Button/Button";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import List from "@material-ui/core/es/List/List";
import Paper from "@material-ui/core/es/Paper/Paper";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import {Grid} from "@material-ui/core";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import DialogOperatingAccountEdit from "./components/DialogOperatingAccountEdit";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import {Messages} from "primereact/messages";

class OperatingAccounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            open: false,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: false,
            action: null,
        }
    }

    renderError(error) {
        return (
            <div>
                <h1>Error {error ? error.status : null}</h1>
                <Button variant={"contained"}
                        onClick={this.props.getInitialData}
                        color={"primary"}>Aceptar</Button>
            </div>
        )
    };

    componentDidMount() {
        this.props.getInitialData();

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {operatingAccounts} = this.props.reducer;
        const {responseRequest} = nextProps.reducer;
        const {operatingAccount} = nextProps.reducer;
        if (responseRequest) {
            console.log(responseRequest);
            const {codeResult} = responseRequest;
            this.renderMessages(codeResult);
            this.props.cleanReducer();
            this.props.getInitialData();
        }
        return operatingAccounts !== operatingAccount;
    }

    static findAccountDimension(item, id) {
        const {accountId} = item;
        return accountId === id
    }

    getNameFindAccountDimension = (accountDimensions, item) => {
        const {accountId} = item;
        const accountDimension = accountDimensions.find(itemAccount => OperatingAccounts.findAccountDimension(itemAccount, accountId));
        return (<ListItemText primary={accountDimension.account}/>);
    };

    createOperatingAccountDispatch = (accountId, typeId) => {
        this.setState({action: "create",});
        this.props.createOperatingAccount(accountId, typeId);
        this.handleCloseDialog();
    };

    updateOperatingAccountDispatch = (accountOperationId, accountId, typeId) => {
        this.setState({action: "update",});
        this.props.updateOperatingAccount(accountOperationId, accountId, typeId);
        this.handleCloseDialog();
    };

    deleteOperatingAccountDispatch = (id) => {
        this.setState({action: "delete",});
        this.props.deleteOperatingAccount(id);
        this.handleCloseDialog();
    };

    renderModal = () => {
        const {item, openModalDelete, openModalCreate, openModalUpdate, openModalView} = this.state;
        const {accountDimensions, types} = this.props.reducer;
        switch (true) {
            case openModalDelete:
                const {accountOperationId} = item;
                return (
                    <div>
                        <h1>Seguro que desea eliminar esta Cuenta</h1>
                        <Button style={{margin: 3}}
                                variant={"contained"}
                                color={"primary"}
                                onClick={() => this.deleteOperatingAccountDispatch(accountOperationId)}>Aceptar</Button>
                        <Button style={{margin: 3}}
                                variant={"contained"}
                                color={"primary"}
                                onClick={this.handleCloseDialog}>Cancelar</Button>
                    </div>);
            case openModalCreate:
                return (
                    <div>
                        <DialogOperatingAccountEdit actionDialog={"create"}
                                                    item={item}
                                                    accountDimensions={accountDimensions}
                                                    types={types}
                                                    onClose={this.handleCloseDialog}
                                                    onClick={this.createOperatingAccountDispatch}/>
                    </div>);
            case openModalUpdate:
                return (
                    <div>
                        <DialogOperatingAccountEdit actionDialog={"update"}
                                                    item={item}
                                                    accountDimensions={accountDimensions}
                                                    types={types}
                                                    onClose={this.handleCloseDialog}
                                                    onClick={this.updateOperatingAccountDispatch}/>
                    </div>);
            case openModalView:
                return (
                    <div>
                        <DialogOperatingAccountEdit actionDialog={"view"}
                                                    item={item}
                                                    accountDimensions={accountDimensions}
                                                    types={types}
                                                    onClose={this.handleCloseDialog}/>
                    </div>);
            default:
                return null;
        }
    };

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
            default:
                return;
        }
    };

    render() {
        const {load, operatingAccounts, errorRequest, accountDimensions} = this.props.reducer;
        if (errorRequest !== null) {
            return this.renderError(errorRequest)
        }
        // noinspection ThisExpressionReferencesGlobalObjectJS
        return (
            <div>
                <Messages ref={(el) => this.messages = el}/>
                {
                    load ?
                        <CircularProgress/> : (
                            <div>
                                <ModalGeneric open={this.state.open} onClose={this.handleCloseDialog}>
                                    {this.renderModal()}
                                </ModalGeneric>
                                {operatingAccounts.length > 0 ? (
                                    <div>
                                        <Paper style={{margin: 5}}>
                                            <Toolbar>
                                                <Button variant={"contained"}
                                                        color={"primary"}
                                                        onClick={() => this.openModalCreateOperatingAccount()}>Nuevo</Button>
                                            </Toolbar>
                                        </Paper>
                                        <List style={{width: '100%', maxWidth: 360}}>
                                            {
                                                operatingAccounts.map(item => {
                                                    const {accountOperationId} = item;
                                                    // noinspection ThisExpressionReferencesGlobalObjectJS
                                                    return (
                                                        <Paper style={{marginTop: 5}} key={accountOperationId}>
                                                            <ListItem alignItems={"flex-start"}>
                                                                <Grid container direction={"column"}>
                                                                    <ListItemText primary={"Id: " + accountOperationId}/>
                                                                    {this.getNameFindAccountDimension(accountDimensions, item)}
                                                                    <Grid item>
                                                                        <Button style={{margin: 3}}
                                                                                onClick={() => this.openModalViewOperatingAccount(item)}
                                                                                variant={"contained"}
                                                                                color={"primary"}>Ver</Button>
                                                                        <Button style={{margin: 3}}
                                                                                onClick={() => this.openModalUpdateOperatingAccount(item)}
                                                                                variant={"contained"}
                                                                                color={"primary"}>Editar</Button>
                                                                        <Button style={{margin: 3}}
                                                                                onClick={() => this.openModalDeleteOperatingAccount(item)}
                                                                                variant={"contained"}
                                                                                color={"secondary"}>Eliminar</Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItem>
                                                        </Paper>
                                                    )
                                                })
                                            }
                                        </List>
                                    </div>
                                ) : <h1>No existen Cuentas Creadas</h1>}
                            </div>
                        )
                }
            </div>
        );
    }

    openModalDeleteOperatingAccount = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: false,
            openModalDelete: true,
            openModalCreate: false,
            openModalUpdate: false,
        })
    };

    openModalUpdateOperatingAccount = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: true,
        })
    };

    openModalCreateOperatingAccount = () => {
        this.setState({
            item: null,
            open: true,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: true,
            openModalUpdate: false,
        })
    };

    openModalViewOperatingAccount = (item) => {
        this.setState({
            item: item,
            open: true,
            openModalView: true,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: false,
        })
    };

    handleCloseDialog = () => {
        this.setState({
            item: null,
            open: false,
            openModalView: false,
            openModalDelete: false,
            openModalCreate: false,
            openModalUpdate: false,
        })
    };

}

const mapStateToProps = state => ({
    reducer: getOperatingAccounts(state),
});

const mapDispatchToProps = dispatch => ({
    getInitialData: () => dispatch(getDataInitialOperatingAccountsServerBi()),
    createOperatingAccount: (accountId, typeId) => dispatch(createOperatingAccountServerBi(accountId, typeId)),
    updateOperatingAccount: (accountOperationId, accountId, typeId) => dispatch(updateOperatingAccountServerBi(accountOperationId, accountId, typeId)),
    deleteOperatingAccount: (id) => dispatch(deleteOperatingAccountServerBi(id)),
    cleanReducer: () => dispatch(cleanRequestOperatingAccountsBi())
});

export default connect(mapStateToProps, mapDispatchToProps)(OperatingAccounts);
