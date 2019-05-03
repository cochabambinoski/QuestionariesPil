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

    createExchangeRate = (idDate, tc) => {

    };

    updateExchangeRate = (exchangeRateId, idDate, tc) => {

    };

    deleteExchangeRate = (id) => {

    };

    componentDidMount() {
        this.props.getDataInitial();
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

    renderModal= () => {

    };

    render() {
        const {load, exchangesRate} = this.props.reducerVariables;
        if (exchangesRate.errorRequest) {
            return this.renderError(exchangesRate.errorRequest)
        }
        console.log(this.props.reducerVariables);
        return (
            <div>
                <ModalGeneric open={this.state.open} onClose={this.handleCloseDialog}>
                    {this.renderModal}
                </ModalGeneric>
                {load ?
                    <CircularProgress/> : (
                        <div>
                            <Paper style={{marginTop: 5}}>
                                <Toolbar>
                                    <Button variant={"contained"} color={"primary"}>Nuevo</Button>
                                </Toolbar>
                            </Paper>
                            <List>
                                {exchangesRate.map(item => {
                                    return (
                                        <Paper style={{marginTop: 5}} key={item.idExchangeRate}>
                                            <ListItem alignItems={"flex-start"}>
                                                <Grid container direction={"column"}>
                                                    <ListItemText>{formatDateToString(item.idDate)}</ListItemText>
                                                    <Grid container>
                                                        <Button style={{margin: 3}}
                                                                onClick={this.createExchangeRate} variant={"contained"}
                                                                color={"primary"}>Ver</Button>
                                                        <Button style={{margin: 3}}
                                                                onClick={() => this.updateExchangeRate(item)}
                                                                variant={"contained"}
                                                                color={"primary"}>Editar</Button>
                                                        <Button style={{margin: 3}}
                                                                onClick={() => this.deleteExchangeRate(item)}
                                                                variant={"contained"}
                                                                color={"secondary"}>Eliminar</Button>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </Paper>
                                    )
                                })}
                            </List>
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
