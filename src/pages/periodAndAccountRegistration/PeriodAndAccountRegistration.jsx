import React, {Component} from 'react';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Button from "@material-ui/core/es/Button/Button";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Paper from "@material-ui/core/es/Paper/Paper";
import {Grid} from "@material-ui/core";
import './PeriodAndAccountRegistration.css';
import connect from "react-redux/es/connect/connect";
import {
    createAccountPeriodServerBi,
    deleteAccountPeriodServerBi,
    getDataCreateAccountPeriodServerBi,
    getInitialAccountPeriodServerBi,
    updateAccountPeriodServerBi
} from "../../actions/indexthunk";
import {getPeriodAndAccountRegistration} from "../../reducers";
import ModalGeneric from "../../widgets/Modal/components/ModalGeneric";
import {cleanRequestAccountPeriodBi} from "../../actions";
import DialogCreateAndEditPeriodAndAccount from "./component/DialogCreateAndEditPeriodAndAccount";
import {formatDateToString} from "../../utils/StringDateUtil";

class PeriodAndAccountRegistration extends Component {
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

    componentDidMount() {
        this.props.getInitialData();
        this.props.getDataCreateAccount();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {accountsPeriod} = this.props.reducer;
        const {nextAccountsPeriod, responseRequest} = nextProps.reducer;
        if (responseRequest !== null) {
            this.props.getInitialData();
            this.props.cleanReducer();
            return true
        }
        return accountsPeriod !== nextAccountsPeriod;
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

    openModalViewAccountPeriod = () => {
        this.setState({
            item: null,
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

    renderDialog = () => {
        const {item, openModalDelete, openModalCreate, openModalUpdate, openModalView} = this.state;
        const {accountsDimension, datesDimension} = this.props.reducer;
        switch (true) {
            case openModalDelete:
                const {idAccountPeriodDimension} = item;
                return (
                    <div>
                        <h1>Seguro que desea eliminar esta cuenta</h1>
                        <Button variant={"contained"}
                                onClick={() => this.deleteAccountPeriodDispatch(idAccountPeriodDimension)}
                                color={"primary"}>Aceptar</Button>
                        <Button variant={"contained"}
                                onClick={this.handleCloseDialog}
                                color={"secondary"}>Cancelar</Button>
                    </div>);
            case openModalCreate:
                return (
                    <div>
                        <DialogCreateAndEditPeriodAndAccount actionDialog={"create"}
                                                             item={item}
                                                             accountDimension={accountsDimension}
                                                             datesDimension={datesDimension}
                                                             onClose={this.handleCloseDialog}
                                                             onClickButton={this.createAccountPeriodDispatch}/>
                    </div>);
            case openModalUpdate:
                return (
                    <div>
                        <DialogCreateAndEditPeriodAndAccount actionDialog={"update"}
                                                             item={item}
                                                             accountDimension={accountsDimension}
                                                             datesDimension={datesDimension}
                                                             onClose={this.handleCloseDialog}
                                                             onClick={this.updateAccountPeriodDispatch}/>
                    </div>
                );
            case openModalView:
                return (
                    <div>
                        <DialogCreateAndEditPeriodAndAccount actionDialog={"view"}
                                                             item={item}
                                                             accountDimension={accountsDimension}
                                                             datesDimension={datesDimension}
                                                             onClose={this.handleCloseDialog}/>
                    </div>
                );
            default:
                return null;
        }
    };

    createAccountPeriodDispatch = (dateId, accountId, amount) => {
        this.props.createAccountPeriod(dateId, accountId, amount);
        this.handleCloseDialog();
    };

    updateAccountPeriodDispatch = (id, dateId, accountId, amount) => {
        this.props.updateAccountPeriod(id, dateId, accountId, amount);
        this.handleCloseDialog();
    };

    deleteAccountPeriodDispatch = (id) => {
        this.handleCloseDialog();
        this.props.deleteAccountPeriod(id);
    };

    render() {
        const {accountsPeriod} = this.props.reducer;
        // noinspection ThisExpressionReferencesGlobalObjectJS
        return (
            <div>
                <ModalGeneric open={this.state.open} onClose={this.handleCloseDialog}>
                    {this.renderDialog()}
                </ModalGeneric>
                <Paper style={{marginTop: 5}}>
                    <Toolbar>
                        <Button color={"primary"}
                                onClick={() => this.openModalCreateAccountPeriod()}
                                variant={"contained"}>Nuevo</Button>
                    </Toolbar>
                </Paper>
                {
                    accountsPeriod.length > 0 ?
                        <List style={{width: '100%', maxWidth: 360}}>
                            {
                                accountsPeriod.map(item => {
                                    const {idAccountPeriodDimension, dateId} = item;
                                    return (
                                        <Paper style={{marginTop: 5}} key={idAccountPeriodDimension}>
                                            <ListItem alignItems={"flex-start"}>
                                                <Grid container direction={"column"}>
                                                    <ListItemText primary={"Id: " + idAccountPeriodDimension}/>
                                                    <ListItemText primary={formatDateToString(dateId)}/>
                                                    <Grid item xs={12}>
                                                        <Grid container direction={"row"} justify={"center"}>
                                                            <Grid item>
                                                                <Button style={{margin: 3}}
                                                                        className={"button-item"}
                                                                        variant={"contained"}
                                                                        onClick={() => this.openModalViewAccountPeriod(item)}
                                                                        color={"primary"}>Ver</Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button style={{margin: 3}}
                                                                        className={'button-item'} variant={"contained"}
                                                                        onClick={() => this.openModalUpdateAccountPeriod(item)}
                                                                        color={"primary"}>Editar</Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button style={{margin: 3}}
                                                                        className={'button-item'} variant={"contained"}
                                                                        onClick={() => this.openModalDeleteAccountPeriod(item)}
                                                                        color={"secondary"}>Eliminar</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </Paper>
                                    )
                                })
                            }
                        </List> : (
                            <h1>No existen cuentas creadas</h1>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reducer: getPeriodAndAccountRegistration(state),
});

const mapDispatchToProps = dispatch => ({
    getInitialData: () => dispatch(getInitialAccountPeriodServerBi()),
    getDataCreateAccount: () => dispatch(getDataCreateAccountPeriodServerBi()),
    createAccountPeriod: (dateId, accountId, amount) => dispatch(createAccountPeriodServerBi(dateId, accountId, amount)),
    updateAccountPeriod: (id, dateId, accountId, amount) => dispatch(updateAccountPeriodServerBi(id, dateId, accountId, amount)),
    deleteAccountPeriod: (id) => dispatch(deleteAccountPeriodServerBi(id)),
    cleanReducer: () => dispatch(cleanRequestAccountPeriodBi())
});

export default connect(mapStateToProps, mapDispatchToProps)(PeriodAndAccountRegistration);
